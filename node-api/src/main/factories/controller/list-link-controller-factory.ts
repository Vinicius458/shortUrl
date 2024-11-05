import { Controller } from "@/presentation/protocols";
import { makeDBlistLink } from "../usecases/list-link";
import { listLinkController } from "@/presentation/controllers/list-link";

export const makeListLinkController = async (): Promise<Controller> => {
  const DBlistLink = await makeDBlistLink();
  const controller = new listLinkController(DBlistLink);
  return controller;
};
