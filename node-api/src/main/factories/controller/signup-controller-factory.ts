import {
  makeDbAuthentication,
  makeSignUpValidation,
  makeDbAddAccount,
} from "@/main/factories";
import { SignUpController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols/controller";

export const makeSignUpController = async (): Promise<Controller> => {
  const addAccount = await makeDbAddAccount();
  const signUpValidation = makeSignUpValidation();
  const authentication = await makeDbAuthentication();
  const controller = new SignUpController(
    addAccount,
    signUpValidation,
    authentication
  );
  return controller;
};
