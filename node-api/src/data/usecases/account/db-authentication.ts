import { Authentication } from "@/domain/usecases";
import {
  HashComparer,
  Encrypter,
  UserRepositoryInterface,
} from "@/data/protocols";

export class DbAuthentication implements Authentication {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth(
    authenticationParams: Authentication.Params
  ): Promise<Authentication.Result> {
    const account = await this.userRepository.loadByEmail(
      authenticationParams.email
    );
    if (account) {
      const isValid = await this.hashComparer.compare(
        authenticationParams.password,
        account.password
      );
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id);
        await this.userRepository.updateAccessToken(account.id, accessToken);
        return {
          accessToken,
          name: account.name,
        };
      }
    }
    return null;
  }
}
