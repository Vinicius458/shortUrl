import Link from "@/domain/entities/link/link";
import LinkInterface from "@/domain/entities/link/link.interface";

export default interface LinkRepositoryInterface {
  create(link: Link): Promise<string>;

  findAll(userId: string): Promise<Array<LinkInterface>>;

  update(linkId: string, updateData: Partial<Link>): Promise<void>;

  delete(linkId: string): Promise<void>;
}
