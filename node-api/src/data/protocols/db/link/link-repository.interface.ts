import Link from "@/domain/entities/link/link";

export default interface LinkRepositoryInterface {
  create(link: Link): Promise<void>;
}
