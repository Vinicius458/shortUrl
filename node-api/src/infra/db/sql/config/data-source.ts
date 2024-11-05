import { DataSource } from "typeorm";
import { User } from "../user/user.model";
import { Link } from "../link/link.model";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./database.sqlite",
  entities: [User, Link],
  synchronize: true,
  logging: false,
});
