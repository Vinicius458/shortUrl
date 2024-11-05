import { LoadAccountByToken } from "@/domain/usecases";
import { Decrypter, UserRepositoryInterface } from "@/data/protocols";

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async load(accessToken: string): Promise<LoadAccountByToken.Result> {
    let token: string;
    try {
      token = await this.decrypter.decrypt(accessToken);
    } catch (error) {
      return null;
    }
    if (token) {
      const account = await this.userRepository.loadByToken(accessToken);
      if (account) {
        return { id: account };
      }
    }
    return null;
  }
}
