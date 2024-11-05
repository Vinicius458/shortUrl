import express, { Express } from "express";
import setupMiddlewares from "./middlewares";
import setupRoutes from "@/main/config/routes";

export const setupApp = (): Express => {
  const app: Express = express();
  setupMiddlewares(app);
  setupRoutes(app);

  return app;
};
