import Link from "@/domain/entities/link/link";
import LinkInterface from "@/domain/entities/link/link.interface";

export interface LinkRepositoryInterface {
  create(link: Link): Promise<string>;

  findAll(userId: string): Promise<Array<LinkInterface>>;
  findByShorterUrl(shortLinkController: string): Promise<LinkInterface>;

  update(linkId: string, updateData: Partial<Link>): Promise<void>;

  delete(userId: string): Promise<void>;
}
