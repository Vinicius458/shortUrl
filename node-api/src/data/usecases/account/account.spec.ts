import { Account } from "@/domain/usecases";
import { AccountUseCase } from "./account";
import User from "@/domain/entities/user/user";
import { UserRepositoryInterface } from "@/data/protocols/db/user/user-repository.interface";
import { Hasher } from "@/data/protocols";

export const mockAccountParams = () => ({
  name: "Joao",
  email: "joao@email.com",
  password: "senha123",
});

const HasherMock = (): jest.Mocked<Hasher> => {
  return {
    hash: jest.fn().mockResolvedValue("sh88hs3h9os"),
  };
};
const UserMockRepository = (): jest.Mocked<UserRepositoryInterface> => {
  return {
    find: jest.fn(),

    create: jest.fn().mockResolvedValue("hvtvbyvy"),
    checkByEmail: jest.fn().mockImplementation(() => Promise.resolve(false)),
  };
};

type SutTypes = {
  sut: Account;
  hasherMock: jest.Mocked<Hasher>;
  userRepositoryMock: jest.Mocked<UserRepositoryInterface>;
};

const makeSut = (): SutTypes => {
  const hasherMock = HasherMock();
  const userRepositoryMock = UserMockRepository();
  const sut = new AccountUseCase(hasherMock, userRepositoryMock);
  return {
    sut,
    hasherMock,
    userRepositoryMock,
  };
};

describe("Unit test account use case", () => {
  test("Should call Hasher with correct password", async () => {
    const { sut, hasherMock } = makeSut();
    const addAccountParams = mockAccountParams();
    const hashSpy = jest.spyOn(hasherMock, "hash");
    await sut.add(addAccountParams);
    expect(hashSpy).toHaveBeenCalledWith(addAccountParams.password);
  });
  test("Should throw if Hasher throws", async () => {
    const { sut, hasherMock } = makeSut();
    jest.spyOn(hasherMock, "hash").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.add(mockAccountParams());
    await expect(promise).rejects.toThrow();
  });

  test("Should call AddAccountRepository with correct values", async () => {
    const { sut, userRepositoryMock } = makeSut();
    const addAccountParams = mockAccountParams();
    const userSpy = jest.spyOn(userRepositoryMock, "create");

    await sut.add(addAccountParams);
    const user = new User(addAccountParams.name, addAccountParams.email);
    user.password = "sh88hs3h9os";
    expect(userSpy).toHaveBeenCalledWith(user);
  });

  test("Should throw if AddAccountRepository throws", async () => {
    const { sut, userRepositoryMock } = makeSut();
    jest.spyOn(userRepositoryMock, "create").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.add(mockAccountParams());
    await expect(promise).rejects.toThrow();
  });

  test("Should return true on success", async () => {
    const { sut } = makeSut();
    const isValid = await sut.add(mockAccountParams());
    expect(isValid).toBe(true);
  });

  test("Should return false if CheckAccountByEmailRepository returns true", async () => {
    const { sut, userRepositoryMock } = makeSut();
    jest.spyOn(userRepositoryMock, "checkByEmail").mockResolvedValue(true);
    const isValid = await sut.add(mockAccountParams());
    expect(isValid).toBe(false);
  });

  test("Should call LoadAccountByEmailRepository with correct email", async () => {
    const { sut, userRepositoryMock } = makeSut();
    const addAccountParams = mockAccountParams();
    const checkByEmail = jest.spyOn(userRepositoryMock, "checkByEmail");
    await sut.add(addAccountParams);
    expect(checkByEmail).toHaveBeenCalledWith(addAccountParams.email);
  });
});
