import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok } from "@/presentation/helpers";
import { ListLink } from "@/domain/usecases/list-link";

export class listLinkController implements Controller {
  constructor(private readonly listLinkUseCase: ListLink) {}

  async handle(request: redirectController.Request): Promise<HttpResponse> {
    try {
      const { accountId } = request;

      const listLinkResult = await this.listLinkUseCase.execute(accountId);
      return ok(listLinkResult);
    } catch (error: any) {
      return serverError(error);
    }
  }
}

export namespace redirectController {
  export type Request = {
    accountId: string;
  };
}
