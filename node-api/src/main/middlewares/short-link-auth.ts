import { makeAuthMiddleware } from "@/main/factories";
import { adaptShortLinkMiddleware } from "../adapters/express-shortLink-middleware";

export const shortLinkAuth = async (): Promise<void> => {
  const AuthMiddleware = await makeAuthMiddleware();
  adaptShortLinkMiddleware(AuthMiddleware);
};
