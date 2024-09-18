import { Response, NextFunction } from "express";

export const contentType = (res: Response, next: NextFunction): void => {
  res.type("json");
  next();
};
