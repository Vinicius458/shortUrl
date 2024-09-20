import User from "@/domain/entities/user/user";

export default interface UserRepositoryInterface {
  find(userId: string): Promise<UserRepositoryInterface.Result>;
}
export namespace UserRepositoryInterface {
  export type Result = User;
}
