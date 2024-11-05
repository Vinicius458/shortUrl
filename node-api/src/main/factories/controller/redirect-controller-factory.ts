import { Controller } from "@/presentation/protocols";
import { makeDBaccessLink } from "../usecases";
import { redirectController } from "@/presentation/controllers";

export const makeRedirectController = async (): Promise<Controller> => {
  const DBaccessLink = await makeDBaccessLink();
  const controller = new redirectController(DBaccessLink);
  return controller;
};
