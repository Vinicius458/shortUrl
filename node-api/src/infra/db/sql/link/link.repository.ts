import { DataSource, Repository } from "typeorm";
import { Link as LinkModel } from "../link/link.model";
import { LinkRepositoryInterface } from "@/data/protocols/db/link/link-repository.interface";
import Link from "@/domain/entities/link/link";
import LinkInterface from "@/domain/entities/link/link.interface";

export default class LinkRepository implements LinkRepositoryInterface {
  private linkRepo: Repository<LinkModel>;
  constructor(private dataSource: DataSource) {
    this.linkRepo = this.dataSource.getRepository(LinkModel);
  }

  async create(linkEntity: Link): Promise<string> {
    const link = this.linkRepo.create({
      originalUrl: linkEntity.originaUrl,
      shortenedUrl: linkEntity.shortenedUrl,
      user: linkEntity.userId ? { id: linkEntity.userId } : undefined,
    });

    const linkCreated = await this.linkRepo.save(link);
    return linkCreated.id;
  }

  async findAll(userId: string): Promise<Array<LinkInterface>> {
    const links = await this.linkRepo.find({ where: { user: { id: userId } } });
    return links.map((link) => {
      const linkEntity = new Link(link.shortenedUrl, link.originalUrl);
      linkEntity.createdAt = link.createdAt;
      return linkEntity;
    });
  }
  async findByShorterUrl(shorterUrl: string): Promise<LinkInterface> {
    const link = await this.linkRepo.findOne({
      where: { shortenedUrl: shorterUrl },
    });

    return new Link(link!.shortenedUrl, link!.originalUrl);
  }

  async update(linkId: string, updateData: Partial<Link>): Promise<void> {
    const link = await this.linkRepo.findOne({ where: { id: linkId } });

    if (!link) {
      throw new Error("Link not found");
    }

    if (updateData.originaUrl) link.originalUrl = updateData.originaUrl;
    if (updateData.shortenedUrl) link.shortenedUrl = updateData.shortenedUrl;

    await this.linkRepo.save(link);
  }

  async delete(userId: string): Promise<void> {
    await this.linkRepo.delete({ user: { id: userId } });
  }
}
