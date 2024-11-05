import { LinkRepositoryInterface } from "@/data/protocols/db/link/link-repository.interface";
import { DeleteLink } from "@/domain/usecases/delete-link";

export class DeleteLinkUseCase implements DeleteLink {
  constructor(private readonly linkRepository: LinkRepositoryInterface) {}

  async execute(userId: string): Promise<void> {
    await this.linkRepository.delete(userId);
  }
}
