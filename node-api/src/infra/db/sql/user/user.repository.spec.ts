import { User as UserModel } from "../user/user.model";
import UserRepository from "./user.repository";
import User from "@/domain/entities/user/user";
import { AppDataSource } from "../config/data-source-test";

describe("UserRepository", () => {
  let userRepository: UserRepository;

  beforeAll(async () => {
    await AppDataSource.initialize();
    userRepository = new UserRepository(AppDataSource);
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await AppDataSource.synchronize(true);
  });

  it("should create a user successfully", async () => {
    const user = new User("Test User", "test@example.com");
    user.password = "hashPassword";
    const userId = await userRepository.create(user);

    expect(userId).toBeDefined();

    const userCreated = await AppDataSource.getRepository(UserModel).findOneBy({
      id: userId,
    });

    expect(userCreated?.name).toBe("Test User");
    expect(userCreated?.email).toBe("test@example.com");
  });

  it("should find a user by ID", async () => {
    const user = new User("Another User", "another@example.com");
    user.password = "hashPassword";
    const userId = await userRepository.create(user);

    const foundUser = await userRepository.find(userId);

    expect(foundUser).toBeDefined();
    expect(foundUser?.name).toBe("Another User");
    expect(foundUser?.email).toBe("another@example.com");
  });

  it("should return null if the user is not found", async () => {
    const foundUser = await userRepository.find("non-existent-id");

    expect(foundUser).toBeNull();
  });

  it("should return true if the user with the email exists", async () => {
    const user = new User("Another User", "existing@example.com");
    user.password = "hashPassword";
    await userRepository.create(user);
    const emailExists = await userRepository.checkByEmail(
      "existing@example.com"
    );

    expect(emailExists).toBe(true);
  });

  it("should return false if the user with the email not exists", async () => {
    const emailExists = await userRepository.checkByEmail(
      "nonexistent@example.com"
    );

    expect(emailExists).toBe(false);
  });

  it("should return user if the user by email exists", async () => {
    const user = new User("Another User", "existing@example.com");
    user.password = "hashPassword";
    await userRepository.create(user);
    const userResult = await userRepository.loadByEmail("existing@example.com");

    expect(userResult).toBeDefined();
    expect(userResult?.name).toBe("Another User");
    expect(userResult?.email).toBe("existing@example.com");
  });

  it("should return null if the user by email not exists", async () => {
    const user = await userRepository.loadByEmail("nonexistent@example.com");

    expect(user).toBe(null);
  });

  it("should update the access token of an existing user", async () => {
    const user = new User("John Doe", "john.doe@example.com");
    user.password = "securepassword";
    await userRepository.create(user);

    const newToken = "newAccessToken";
    await userRepository.updateAccessToken(user.id, newToken);

    const updatedUser = await userRepository.find(user.id);
    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.token).toBe(newToken);
  });

  it("should throw an error if the user does not exist", async () => {
    await expect(
      userRepository.updateAccessToken("nonExistentId", "token")
    ).rejects.toThrow("User not found");
  });

  it("should return the user ID for a valid token", async () => {
    const user = new User("John Doe", "john.doe@example.com");
    user.password = "securepassword";
    const userIdCreated = await userRepository.create(user);

    const newToken = "newAccessToken";
    await userRepository.updateAccessToken(user.id, newToken);

    // Act: Carregar o usuário pelo token
    const userId = await userRepository.loadByToken("newAccessToken");

    // Assert: Verificar se o ID do usuário retornado é correto
    expect(userId).toBe(userIdCreated);
  });

  it("should return null for an invalid token", async () => {
    // Act: Tentar carregar um usuário com um token inexistente
    const userId = await userRepository.loadByToken("invalidToken");

    // Assert: Verificar se o retorno é nulo
    expect(userId).toBeNull();
  });
});
