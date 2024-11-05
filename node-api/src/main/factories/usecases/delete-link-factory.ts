import { AppDataSource } from "@/infra/db/sql/config/data-source";
import LinkRepository from "@/infra/db/sql/link/link.repository";
import { DeleteLink } from "@/domain/usecases/delete-link";
import { DeleteLinkUseCase } from "@/data/usecases/delete-link/delete-link";

export const makeDBdeleteLink = async (): Promise<DeleteLink> => {
  const linkRepository = new LinkRepository(AppDataSource);
  return new DeleteLinkUseCase(linkRepository);
};
