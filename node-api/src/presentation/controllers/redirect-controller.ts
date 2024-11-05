import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok } from "@/presentation/helpers";
import { AccessLink } from "@/domain/usecases/access-link";

export class redirectController implements Controller {
  constructor(private readonly accessLinkUseCase: AccessLink) {}

  async handle(request: redirectController.Request): Promise<HttpResponse> {
    try {
      const { shortLink } = request;

      const shortLinkResult = await this.accessLinkUseCase.execute(shortLink);
      return ok(shortLinkResult);
    } catch (error: any) {
      return serverError(error);
    }
  }
}

export namespace redirectController {
  export type Request = {
    shortLink: string;
  };
}
