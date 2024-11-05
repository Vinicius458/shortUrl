import { DataSource } from "typeorm";
import { User } from "../user/user.model";
import { Link } from "../link/link.model";
import env from "@/main/config/env";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: env.dbUrl,
  entities: [User, Link],
  synchronize: true,
  logging: false,
});
