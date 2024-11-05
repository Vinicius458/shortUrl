import LinkInterface from "./link.interface";

export default class Link implements LinkInterface {
  private _userId: string;
  constructor(
    private _shortenedUrl: string,
    private _originalUrl: string
  ) {}

  get shortenedUrl(): string {
    return this._shortenedUrl;
  }

  get originaUrl(): string {
    return this._originalUrl;
  }

  set userId(id: string) {
    this._userId = id;
  }

  get userId(): string {
    return this._userId;
  }

  combineLink(host: string): string {
    return `${host}/${this._shortenedUrl}`;
  }
}
