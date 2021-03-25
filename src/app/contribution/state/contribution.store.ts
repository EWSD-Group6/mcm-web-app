import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Contribution } from './contribution.model';
import {ArticleArticleRes, ContributionImageRes} from '../../api';

export interface ContributionState extends EntityState<Contribution> {
  paginate: {
    total: number;
    pageSize: number;
    pageIndex: number;
  };
  query: {
    page?: number;
    limit?: number;
    contributionSessionId?: number;
    facultyId?: number;
    status?: 'accepted' | 'rejected' | 'reviewing';
    studentId?: number;
  };
  images: ContributionImageRes[];
  article: ArticleArticleRes;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'contribution' })
export class ContributionStore extends EntityStore<ContributionState> {

  constructor() {
    super({
      paginate: {
        total: null,
        pageSize: 10,
        pageIndex: 1,
      },
      query: {
        limit: 10,
        page: 0,
      },
    });
  }

}
