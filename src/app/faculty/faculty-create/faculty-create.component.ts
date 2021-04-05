import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {markFormGroupDirty} from '../../core/form-utils';
import {FacultyService} from '../state/faculty.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Faculty} from "../state/faculty.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {filter, map, switchMap} from "rxjs/operators";

@UntilDestroy()
@Component({
  selector: 'app-faculty-create',
  templateUrl: './faculty-create.component.html',
  styleUrls: ['./faculty-create.component.scss']
})
export class FacultyCreateComponent implements OnInit {
  form: FormGroup;
  editingFaculty: Faculty;
  constructor(private fb: FormBuilder,
              private service: FacultyService,
              private router: Router,
              private route: ActivatedRoute) {
    this.form = this.fb.group({
      name: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.data.pipe(
      untilDestroyed(this),
      filter(x => x.isEdit),
      switchMap(() => this.route.paramMap),
      map(x => Number(x.get('id'))),
      switchMap(x => this.service.getById(x)),
    ).subscribe(
      x => {
        this.editingFaculty = x;
        this.form.patchValue({
          name: this.editingFaculty.name,
        });
      }
    );
  }

  submitForm(): void {
    markFormGroupDirty(this.form);
    if (this.form.valid) {
      if (this.editingFaculty) {
        this.service.update(this.editingFaculty.id, this.form.value).subscribe(
          () => this.router.navigate(['/faculty'])
        );
      } else {
        this.service.add(this.form.value).subscribe(
          () => this.router.navigate(['/faculty'])
        );
      }
    }
  }
}
