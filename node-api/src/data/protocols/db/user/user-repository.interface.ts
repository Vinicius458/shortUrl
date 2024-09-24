import User from "@/domain/entities/user/user";

export interface UserRepositoryInterface {
  create(userEntity: User): Promise<string>;

  find(userId: string): Promise<User | null>;
  checkByEmail(email: string): Promise<Boolean>;
  loadByEmail(email: string): Promise<User | null>;
}
