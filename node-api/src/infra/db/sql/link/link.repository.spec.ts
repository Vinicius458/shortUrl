import LinkRepository from "./link.repository";
import { Link as LinkModel } from "./link.model";
import Link from "@/domain/entities/link/link";
import User from "@/domain/entities/user/user";
import { User as UserModel } from "@/infra/db/sql/user/user.model";
import { AppDataSource } from "../config/data-source-test";

describe("LinkRepository Integration Test", () => {
  let linkRepository: LinkRepository;
  let userRepository: any;

  beforeAll(async () => {
    await AppDataSource.initialize();
    linkRepository = new LinkRepository(AppDataSource);
    userRepository = AppDataSource.getRepository(UserModel);
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    // Limpar o banco de dados antes de cada teste
    await AppDataSource.synchronize(true);
  });

  it("should create a link record in the database", async () => {
    const user = new User("user_name", "user_email");
    user.password = "hashPassword";

    const userCreated = await userRepository.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const userSaved = await userRepository.save(userCreated);
    const linkEntity = new Link("abc123", "https://example.com");

    linkEntity.userId = userSaved.id;
    await linkRepository.create(linkEntity);

    const linkRepo = AppDataSource.getRepository(LinkModel);
    const savedLink = await linkRepo.findOne({
      where: { shortenedUrl: "abc123" },
      relations: ["user"],
    });

    expect(savedLink).not.toBeNull();
    expect(savedLink?.originalUrl).toBe("https://example.com");
    expect(savedLink?.shortenedUrl).toBe("abc123");
    expect(savedLink?.user).not.toBeNull();
  });

  it("should find all links by userId", async () => {
    const user1 = new User("user1_name", "user1_email");
    user1.password = "hashPassword";
    const userCreated1 = await userRepository.create({
      name: user1.name,
      email: user1.email,
      password: user1.password,
    });

    const userSaved1 = await userRepository.save(userCreated1);

    const user2 = new User("user2_name", "user2_email");
    user2.password = "hashPassword2";
    const userCreated2 = await userRepository.create({
      name: user2.name,
      email: user2.email,
      password: user2.password,
    });

    await userRepository.save(userCreated2);

    const linkEntity = new Link("abc123", "https://example.com");

    linkEntity.userId = userSaved1.id;
    await linkRepository.create(linkEntity);

    const links = await linkRepository.findAll(userSaved1.id);

    expect(links).not.toBeNull();
    expect(links.length).toBe(1);
    expect(links[0].originaUrl).toBe("https://example.com");
    expect(links[0].shortenedUrl).toBe("abc123");
  });

  it("Should update with success", async () => {
    const user = new User("user_name", "user_email");
    user.password = "hashPassword";
    const userCreated = await userRepository.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const userSaved = await userRepository.save(userCreated);
    const linkEntity = new Link("abc123", "https://example.com");

    linkEntity.userId = userSaved.id;
    const linkId = await linkRepository.create(linkEntity);

    await linkRepository.update(linkId, {
      originaUrl: "https://updated-example.com",
      shortenedUrl: "new123",
    });

    const linkRepo = AppDataSource.getRepository(LinkModel);

    const afterUpdate = await linkRepo.findOne({
      where: { id: linkId },
      relations: ["user"],
    });

    expect(afterUpdate?.originalUrl).toBe("https://updated-example.com");
    expect(afterUpdate?.shortenedUrl).toBe("new123");
  });

  it("should find a link by shortened URL", async () => {
    const originalUrl = "https://example.com/original-url";
    const shortenedUrl = "abc123";
    const link = new Link(shortenedUrl, originalUrl);
    await linkRepository.create(link);
    const foundLink = await linkRepository.findByShorterUrl(shortenedUrl);

    expect(foundLink.shortenedUrl).toBe(shortenedUrl);
    expect(foundLink.originaUrl).toBe(originalUrl);
  });

  it("should throw an erro if the link is not found", async () => {
    await expect(
      linkRepository.update("999", { originaUrl: "https://nonexistent.com" })
    ).rejects.toThrow("Link not found");
  });

  it("Should remove the link with success", async () => {
    const user = new User("user_name", "user_email");
    user.password = "hashPassword";
    const userCreated = await userRepository.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const userSaved = await userRepository.save(userCreated);
    const linkEntity = new Link("abc123", "https://example.com");

    linkEntity.userId = userSaved.id;
    const linkId = await linkRepository.create(linkEntity);
    const links = await linkRepository.findAll(userSaved.id);

    expect(links.length).toBe(1);
    await linkRepository.delete(linkId);

    const linkRemoved = await linkRepository.findAll(userSaved.id);

    expect(linkRemoved.length).toBe(0);
  });
  it("should throw an erro if the link is not found", async () => {
    await expect(linkRepository.delete("999")).rejects.toThrow(
      "Link not found"
    );
  });
});
