export interface ListLink {
  execute: (userId: string) => Promise<Array<ListLink.Result>>;
}
export namespace ListLink {
  export type Result = { link: string; createdAt: Date };
}
