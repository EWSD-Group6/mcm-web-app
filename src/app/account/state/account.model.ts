export interface Account {
  createdAt?: string;
  email?: string;
  facultyId?: number;
  id?: number;
  name?: string;
  role?: string;
  updatedAt?: string;
}

export const createAccount = (params: Partial<Account>) => ({...params} as Account);
