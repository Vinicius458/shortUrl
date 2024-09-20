export interface UrlConverter {
  shorten: (link: string) => Promise<string>;
}
