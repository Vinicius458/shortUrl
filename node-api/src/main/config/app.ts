import express, { Express } from "express";
// import { Sequelize } from "sequelize-typescript";
import setupMiddlewares from "./middlewares";
// import setupRoutes from "@/main/config/routes";
// import CustomerModel from "../customer/repository/sequelize/customer.model";

// import ProductModel from "../product/repository/sequelize/product.model";

export const setupApp = (): Express => {
  const app: Express = express();
  setupMiddlewares(app);
  // setupRoutes(app);

  // export let sequelize: Sequelize;

  // async function setupDb() {
  //   sequelize = new Sequelize({
  //     dialect: "sqlite",
  //     storage: ":memory:",
  //     logging: false,
  //   });
  //   await sequelize.addModels([CustomerModel]);
  //   await sequelize.addModels([ProductModel]);
  //   await sequelize.sync();
  // }
  // setupDb();
  return app;
};
