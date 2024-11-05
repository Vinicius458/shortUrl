import { AppDataSource } from "@/infra/db/sql/config/data-source";
import { setupApp } from "./config/app";
import dotenv from "dotenv";
import "reflect-metadata";

dotenv.config();
const port: number = Number(process.env.PORT) || 3000;
const app = setupApp();
async function initializeApp() {
  await AppDataSource.initialize();

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}
initializeApp();
