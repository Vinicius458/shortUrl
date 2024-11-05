import { UrlConverter } from "@/data/protocols";
import { nanoid } from "nanoid";
export class Shorter implements UrlConverter {
  async shorten(): Promise<string> {
    return nanoid(6);
  }
}
