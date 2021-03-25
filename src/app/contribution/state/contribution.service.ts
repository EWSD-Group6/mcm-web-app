import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import {switchMap, take, tap} from 'rxjs/operators';
import {Contribution, createContribution} from './contribution.model';
import { ContributionStore } from './contribution.store';
import {ContributionsService} from "../../api";
import {ContributionQuery} from "./contribution.query";

@Injectable({ providedIn: 'root' })
export class ContributionService {

  constructor(private contributionStore: ContributionStore,
              private contributionApiService: ContributionsService,
              private query: ContributionQuery) {
  }


  get() {
    this.contributionStore.setLoading(true);
    return this.query.select(x => x.query).pipe(
      take(1),
      switchMap(query => this.contributionApiService.contributionsGet(
        query.contributionSessionId,
        query.facultyId,
        query.limit,
        query.page,
        query.status,
        query.studentId,
      )),
      tap(x => this.contributionStore.set(x.data.map(item => createContribution(item)))),
      tap(x => this.contributionStore.update({
        paginate: {
          total: x.commonPaginateResponse.,
          pageIndex: x.currentPage + 1,
          pageSize: x.perPage,
        }
      })),
      finalize(() => this.productStore.setLoading(false)),
    );
  }

  add(contribution: Contribution) {
    this.contributionStore.add(contribution);
  }

  update(id, contribution: Partial<Contribution>) {
    this.contributionStore.update(id, contribution);
  }

  remove(id: ID) {
    this.contributionStore.remove(id);
  }

}
