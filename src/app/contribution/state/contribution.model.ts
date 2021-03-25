export interface Contribution {
  id: number | string;
}

export function createContribution(params: Partial<Contribution>) {
  return {
    ...params,
  } as Contribution;
}
