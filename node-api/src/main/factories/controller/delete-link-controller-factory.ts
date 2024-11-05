import { Controller } from "@/presentation/protocols";
import { makeDBdeleteLink } from "../usecases";
import { deleteLinkController } from "@/presentation/controllers/delete-link-controller";

export const makeDeleteLinkController = async (): Promise<Controller> => {
  const DBdeleteLink = await makeDBdeleteLink();
  const controller = new deleteLinkController(DBdeleteLink);
  return controller;
};
