export interface ListLink {
  execute: (userId: string) => Promise<Array<string>>;
}
