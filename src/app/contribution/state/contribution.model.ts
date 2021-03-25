import {ContributionUserRes} from '../../api';

export interface Contribution {
  description?: string;
  articleId?: number;
  title?: string;
  contributeSessionId?: number;
  createdAt?: string;
  id?: number;
  status?: string;
  updatedAt?: string;
  user?: ContributionUserRes;
}

export const createContribution = (params: Partial<Contribution>) => ({
  ...params,
} as Contribution);
