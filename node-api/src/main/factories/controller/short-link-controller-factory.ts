import { Controller } from "@/presentation/protocols";
import { ShortLinkController } from "@/presentation/controllers/short-link-controller";
import { makeShortLinkValidation } from "./short-link-validation-factory";
import { makeDBshortLink } from "../usecases";

export const shortLinkController = async (): Promise<Controller> => {
  const DBshortLink = await makeDBshortLink();
  const controller = new ShortLinkController(
    makeShortLinkValidation(),
    DBshortLink
  );
  return controller;
};
