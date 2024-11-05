import { makeDbLoadAccountByToken } from "@/main/factories";
import { Middleware } from "@/presentation/protocols";
import { AuthMiddleware } from "@/presentation/middlewares";

export const makeAuthMiddleware = async (): Promise<Middleware> => {
  const loadAccountByToken = await makeDbLoadAccountByToken();
  return new AuthMiddleware(loadAccountByToken);
};
