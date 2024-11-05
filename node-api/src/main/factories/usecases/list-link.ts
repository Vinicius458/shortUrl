import { AppDataSource } from "@/infra/db/sql/config/data-source";
import LinkRepository from "@/infra/db/sql/link/link.repository";
import { ListLink } from "@/domain/usecases/list-link";
import { ListLinkUseCase } from "@/data/usecases/list-link/list-link";

export const makeDBlistLink = async (): Promise<ListLink> => {
  const linkRepository = new LinkRepository(AppDataSource);
  return new ListLinkUseCase(linkRepository);
};
