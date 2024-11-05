import { DataSource } from "typeorm";
import { User } from "../user/user.model";
import { Link } from "../link/link.model";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  entities: [Link, User],
  synchronize: true,
  logging: false,
});
