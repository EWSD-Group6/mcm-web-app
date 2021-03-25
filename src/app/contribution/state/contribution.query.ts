import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ContributionStore, ContributionState } from './contribution.store';

@Injectable({ providedIn: 'root' })
export class ContributionQuery extends QueryEntity<ContributionState> {

  constructor(protected store: ContributionStore) {
    super(store);
  }

}
