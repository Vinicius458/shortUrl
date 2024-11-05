import { LinkRepositoryInterface } from "@/data/protocols/db/link/link-repository.interface";
import { AccessLink } from "@/domain/usecases/access-link";

export class AccessLinkUseCase implements AccessLink {
  constructor(private readonly linkRepository: LinkRepositoryInterface) {}

  async execute(shortLink: string): Promise<string> {
    return (await this.linkRepository.findByShorterUrl(shortLink)).originaUrl;
  }
}
