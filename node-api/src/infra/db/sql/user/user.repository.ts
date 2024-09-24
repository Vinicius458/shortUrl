import { DataSource, Repository } from "typeorm";
import { User as UserModel } from "../user/user.model";
import { UserRepositoryInterface } from "@/data/protocols/db/user/user-repository.interface";
import User from "@/domain/entities/user/user";

export default class UserRepository implements UserRepositoryInterface {
  private userRepo: Repository<UserModel>;
  constructor(private dataSource: DataSource) {
    this.userRepo = this.dataSource.getRepository(UserModel);
  }

  async create(userEntity: User): Promise<string> {
    const user = this.userRepo.create({
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.password,
    });

    const userCreated = await this.userRepo.save(user);
    return userCreated.id;
  }
  async find(userId: string): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (user) {
      const userEntity = new User(user.name, user.email);
      userEntity.id = user.id;
      return userEntity;
    }
    return null;
  }
  async checkByEmail(email: string): Promise<Boolean> {
    const user = await this.userRepo.findOneBy({ email });
    return user != null;
  }
}
