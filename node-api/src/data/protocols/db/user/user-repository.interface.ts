import User from "@/domain/entities/user/user";

export default interface UserRepositoryInterface {
  create(userEntity: User): Promise<string>;

  find(userId: string): Promise<User | null>;
}
