import {
  ValidationComposite,
  RequiredFieldValidation,
} from "@/validation/validators";
import { Validation } from "@/presentation/protocols";

export const makeShortLinkValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["link"]) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
