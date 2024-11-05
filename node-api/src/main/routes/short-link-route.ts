import { adaptRedirectRoute, adaptRoute } from "@/main/adapters";
import { shortLinkController, makeRedirectController } from "@/main/factories";
import { Router } from "express";
import { shortLinkAuth } from "../middlewares/short-link-auth";
import { auth } from "../middlewares";
import { makeListLinkController } from "../factories/controller/list-link-controller-factory";
import { makeDeleteLinkController } from "../factories/controller/delete-link-controller-factory";

export default async (router: Router): Promise<void> => {
  const shortLink = await shortLinkController();
  const deleteLink = await makeDeleteLinkController();
  const redirect = await makeRedirectController();
  const listController = await makeListLinkController();

  router.get("/url", auth, adaptRoute(listController));
  router.delete("/url", auth, adaptRoute(deleteLink));
  router.post("/url/shorten", shortLinkAuth, adaptRoute(shortLink));
  router.get("/:shortLink", adaptRedirectRoute(redirect));
};
