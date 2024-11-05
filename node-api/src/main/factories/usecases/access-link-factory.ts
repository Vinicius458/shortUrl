import { AppDataSource } from "@/infra/db/sql/config/data-source";
import LinkRepository from "@/infra/db/sql/link/link.repository";
import { AccessLinkUseCase } from "@/data/usecases/short-link/access-link";
import { AccessLink } from "@/domain/usecases/access-link";

export const makeDBaccessLink = async (): Promise<AccessLink> => {
  const linkRepository = new LinkRepository(AppDataSource);
  return new AccessLinkUseCase(linkRepository);
};
