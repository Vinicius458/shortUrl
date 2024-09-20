import { ShortLink } from "@/domain/usecases";
import { UrlConverter } from "@/data/protocols/shorter/shorten";
import Link from "@/domain/entities/link/link";
import LinkRepositoryInterface from "@/data/protocols/db/link/link-repository.interface";
import UserRepositoryInterface from "@/data/protocols/db/user/user-repository.interface";

export class ShortLinkUseCase implements ShortLink {
  constructor(
    private readonly urlConverter: UrlConverter,
    private readonly host: string,
    private readonly userRepository: UserRepositoryInterface,
    private readonly linkRepository: LinkRepositoryInterface
  ) {}

  async execute(shortLinkParams: ShortLink.Params): Promise<string> {
    const shortUrl = await this.urlConverter.shorten(shortLinkParams.link);
    const link = new Link(this.host, shortUrl, shortLinkParams.link);
    link.combineLink();

    if (shortLinkParams.userId) {
      const user = await this.userRepository.find(shortLinkParams.userId);
      if (user) await this.linkRepository.create(link);
    }
    return link.shortLink;
  }
}
