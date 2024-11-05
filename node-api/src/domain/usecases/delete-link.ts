export interface DeleteLink {
  execute: (userId: string) => Promise<void>;
}
