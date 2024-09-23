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
});
