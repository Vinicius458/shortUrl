import LinkInterface from "./link.interface";

export default class Link implements LinkInterface {
  constructor(
    private _host: string,
    private _shortLink: string,
    private _originalUrl: string
  ) {}

  get shortLink(): string {
    return this._shortLink;
  }

  get originaUrl(): string {
    return this._originalUrl;
  }

  combineLink() {
    this._shortLink = `${this._host}/${this._shortLink}`;
  }
}
