export default interface LinkInterface {
  combineLink(host: string): void;

  get shortenedUrl(): string;

  get originaUrl(): string;

  get userId(): string;

  set userId(id: string);
  get createdAt(): Date;

  set createdAt(date: Date);
}
