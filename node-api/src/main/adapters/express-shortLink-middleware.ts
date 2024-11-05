import { Middleware } from "@/presentation/protocols";

import { Request, Response, NextFunction } from "express";

export const adaptShortLinkMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const tokenWithBearer = req.headers.authorization;
    const token = tokenWithBearer?.split(" ")[1];
    const request = {
      accessToken: token,
      ...(req.headers || {}),
    };

    const httpResponse = await middleware.handle(request);
    Object.assign(req, httpResponse.body);
    next();
  };
};
