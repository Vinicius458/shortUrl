import { Controller, HttpResponse, Validation } from "@/presentation/protocols";
import { serverError, ok, badRequest } from "@/presentation/helpers";
import { ShortLink } from "@/domain/usecases";

export class ShortLinkController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly shortLinkUseCase: ShortLink
  ) {}

  async handle(
    request: LoadSurveyResultController.Request
  ): Promise<HttpResponse> {
    try {
      const { link, accountId } = request;

      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }

      const shortLink = await this.shortLinkUseCase.execute({
        link,
        userId: accountId,
      });
      return ok(shortLink);
    } catch (error: any) {
      return serverError(error);
    }
  }
}

export namespace LoadSurveyResultController {
  export type Request = {
    link: string;
    accountId?: string;
  };
}
