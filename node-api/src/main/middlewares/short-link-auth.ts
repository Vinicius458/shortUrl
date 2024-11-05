import { makeAuthMiddleware } from "@/main/factories";
import { adaptShortLinkMiddleware } from "../adapters/express-shortLink-middleware";

export const shortLinkAuth = adaptShortLinkMiddleware(makeAuthMiddleware());
