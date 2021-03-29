export interface Faculty {
  createdAt?: string;
  id?: number;
  name?: string;
  updatedAt?: string;
}

export const createFaculty = (params: Partial<Faculty>) => ({...params} as Faculty);
