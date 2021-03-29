import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {FacultyState, FacultyStore} from './faculty.store';

@Injectable({providedIn: 'root'})
export class FacultyQuery extends QueryEntity<FacultyState> {

  constructor(protected store: FacultyStore) {
    super(store);
  }

}
