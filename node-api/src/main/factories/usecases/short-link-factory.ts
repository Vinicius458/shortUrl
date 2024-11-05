import { ShortLink } from "@/domain/usecases/short-link";
import { ShortLinkUseCase } from "@/data/usecases/short-link/short-link";
import { UserRepository } from "@/infra/db/sql/user/user.repository";
import { AppDataSource } from "@/infra/db/sql/config/data-source";
import LinkRepository from "@/infra/db/sql/link/link.repository";
import env from "@/main/config/env";
import { Shorter } from "@/infra/shorter/shorter";

export const makeDBshortLink = async (): Promise<ShortLink> => {
  const host = `${env.appHost}${env.port}/api`;
  const userRepository = new UserRepository(AppDataSource);
  const linkRepository = new LinkRepository(AppDataSource);
  const shorter = new Shorter();
  return new ShortLinkUseCase(shorter, host, userRepository, linkRepository);
};
