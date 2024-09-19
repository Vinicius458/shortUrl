export default interface LinkInterface {
  combineLink(): void;

  get shortLink(): string;

  get originaUrl(): string;
}
