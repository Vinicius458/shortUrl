import { ShortLink } from "@/domain/usecases";
import { UrlConverter } from "../protocols/shorten";
import Link from "@/domain/entities/link/link";

export class ShortLinkUseCase implements ShortLink {
  constructor(
    private readonly urlConverter: UrlConverter,
    private readonly host: string,
    private readonly userRepository: any,
    private readonly linkRepository: any
  ) {}

  async shortener(shortLinkParams: ShortLink.Params): Promise<string> {
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
