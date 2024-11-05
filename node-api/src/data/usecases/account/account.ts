import { Account } from "@/domain/usecases";
import { Hasher } from "@/data/protocols";
import { UserRepositoryInterface } from "@/data/protocols/db/user/user-repository.interface";
import User from "@/domain/entities/user/user";

export class AccountUseCase implements Account {
  constructor(
    private readonly hasher: Hasher,
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async add(accountData: Account.Params): Promise<Account.Result> {
    const exists = await this.userRepository.checkByEmail(accountData.email);
    let isValid = false;
    if (!exists) {
      const hashedPassword = await this.hasher.hash(accountData.password);
      const user = new User(accountData.name, accountData.email);
      user.password = hashedPassword;
      isValid = !!(await this.userRepository.add(user));
    }
    return isValid;
  }
}
