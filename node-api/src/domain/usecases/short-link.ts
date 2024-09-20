export interface ShortLink {
  execute: (shortLinkParams: ShortLink.Params) => Promise<string>;
}

export namespace ShortLink {
  export type Params = {
    link: string;
    userId?: string;
  };
}
