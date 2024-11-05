import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok } from "@/presentation/helpers";
import { DeleteLink } from "@/domain/usecases/delete-link";

export class deleteLinkController implements Controller {
  constructor(private readonly deleteLinkUseCase: DeleteLink) {}

  async handle(request: redirectController.Request): Promise<HttpResponse> {
    try {
      const { accountId } = request;
      await this.deleteLinkUseCase.execute(accountId);
      return ok({ message: "Delete all links" });
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
