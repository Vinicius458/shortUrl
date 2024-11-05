import { adaptMiddleware } from "@/main/adapters";
import { makeAuthMiddleware } from "@/main/factories";

export const auth = async (): Promise<void> => {
  const AuthMiddleware = await makeAuthMiddleware();
  adaptMiddleware(AuthMiddleware);
};
