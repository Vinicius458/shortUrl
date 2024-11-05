import { LinkRepositoryInterface } from "@/data/protocols/db/link/link-repository.interface";
import { ListLink } from "@/domain/usecases/list-link";

export class ListLinkUseCase implements ListLink {
  constructor(private readonly linkRepository: LinkRepositoryInterface) {}

  async execute(userId: string): Promise<Array<string>> {
    const links = await this.linkRepository.findAll(userId);
    return links.map((link) => {
      return link.originaUrl;
    });
  }
}
