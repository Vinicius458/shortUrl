import { AccountUseCase } from "@/data/usecases/account/account";
import { Account } from "@/domain/usecases";
import { UserRepository } from "@/infra/db/sql/user/user.repository";
import { BcryptAdapter } from "@/infra/cryptography";
import { AppDataSource } from "@/infra/db/sql/config/data-source";

export const makeDbAddAccount = async (): Promise<Account> => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const userRepository = new UserRepository(AppDataSource);
  return new AccountUseCase(bcryptAdapter, userRepository);
};
