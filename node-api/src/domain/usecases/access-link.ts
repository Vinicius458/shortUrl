export interface AccessLink {
  execute: (shortLink: string) => Promise<string>;
}
