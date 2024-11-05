export interface UrlConverter {
  shorten: () => Promise<string>;
}
