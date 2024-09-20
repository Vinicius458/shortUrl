import { ShortLink } from "@/domain/usecases";
import { ShortLinkUseCase } from "./short-link";
import User from "@/domain/entities/user/user";
import { UrlConverter } from "@/data/protocols/shorter/shorten";
import UserRepositoryInterface from "@/data/protocols/db/user/user-repository.interface";
import LinkRepositoryInterface from "@/data/protocols/db/link/link-repository.interface";

const input: ShortLink.Params = {
  link: "https://maxim-gorin.medium.com/core-principles-of-clean-architecture-from-entities-to-frameworks-7b479cd0d19e",
};

const output = "localhost:4200/h3jahb";

const UrlConverterMock = (): jest.Mocked<UrlConverter> => {
  return {
    shorten: jest.fn().mockResolvedValue("h3jahb"),
  };
};
const UserMockRepository = (): jest.Mocked<UserRepositoryInterface> => {
  return {
    find: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve(
          new User("any_userId", "fake_Name", "fakemail@email.com")
        )
      ),
  };
};
const LinkMockRepository = (): jest.Mocked<LinkRepositoryInterface> => {
  return {
    create: jest.fn(),
  };
};

type SutTypes = {
  sut: ShortLink;
  urlConverterMock: jest.Mocked<UrlConverter>;
  userMockRepository: jest.Mocked<UserRepositoryInterface>;
  linkMockRepository: jest.Mocked<LinkRepositoryInterface>;
};

const makeSut = (): SutTypes => {
  const urlConverterMock = UrlConverterMock();
  const userMockRepository = UserMockRepository();
  const linkMockRepository = LinkMockRepository();
  const sut = new ShortLinkUseCase(
    urlConverterMock,
    "localhost:4200",
    userMockRepository,
    linkMockRepository
  );
  return { sut, userMockRepository, urlConverterMock, linkMockRepository };
};

describe("Unit test generate shortLink use case", () => {
  it("should thrown an error when url coverter throw an error", async () => {
    const { sut, urlConverterMock } = makeSut();

    jest.spyOn(urlConverterMock, "shorten").mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.execute(input)).rejects.toThrow();
  });
  it("Should generate only a link if not an authenticated user", async () => {
    const { sut, userMockRepository } = makeSut();

    const findUserRepositorySpy = jest.spyOn(userMockRepository, "find");

    const result = await sut.execute(input);

    expect(result).toBe(output);
    expect(findUserRepositorySpy).not.toHaveBeenCalled();
  });

  it("Should generate a link, be authenticated, but the userId not found in database", async () => {
    const { sut, userMockRepository } = makeSut();
    input.userId = "any_userId";
    const findUserRepositorySpy = jest.spyOn(userMockRepository, "find");
    const result = await sut.execute(input);

    expect(result).toBe(output);
    expect(findUserRepositorySpy).toHaveBeenCalled();
    expect(findUserRepositorySpy).toHaveBeenCalledWith(input.userId);
  });

  it("Should generate a link, be authenticated, but the userId not found in database", async () => {
    const { sut, userMockRepository, linkMockRepository } = makeSut();
    input.userId = "any_userId";
    const createLinkRepositorySpy = jest.spyOn(linkMockRepository, "create");
    const findUserRepositorySpy = jest.spyOn(userMockRepository, "find");

    const result = await sut.execute(input);

    expect(result).toBe(output);
    expect(findUserRepositorySpy).toHaveBeenCalled();
    expect(findUserRepositorySpy).toHaveBeenCalledWith(input.userId);
    expect(createLinkRepositorySpy).toHaveBeenCalled();
  });
});
