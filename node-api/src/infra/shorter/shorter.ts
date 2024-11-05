import { UrlConverter } from "@/data/protocols";
import { nanoid } from "nanoid";
export class Shorter implements UrlConverter {
  async shorten(link: string): Promise<string> {
    return nanoid(6);
  }
}
