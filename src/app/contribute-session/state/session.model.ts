export interface Session {
  closureTime?: string;
  createdAt?: string;
  exportedAssets?: string;
  finalClosureTime?: string;
  id?: number;
  openTime?: string;
  updatedAt?: string;
}

export const createSession = (params: Partial<Session>) => ({...params} as Session);
