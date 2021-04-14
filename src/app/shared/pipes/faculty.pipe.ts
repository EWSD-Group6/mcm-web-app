import { Pipe, PipeTransform } from '@angular/core';
import {FacultyService} from '../../faculty/state/faculty.service';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {EMPTY} from 'rxjs';

@Pipe({
  name: 'faculty'
})
export class FacultyPipe implements PipeTransform {

  constructor(private facultyService: FacultyService) {
  }
  transform(id: number): Observable<string> {
    if (id) {
      return this.facultyService.getById(id).pipe(map(x => x.name));
    }
    return EMPTY;
  }

}
