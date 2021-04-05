import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {markFormGroupDirty} from '../../core/form-utils';
import {FacultyService} from '../state/faculty.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-faculty-create',
  templateUrl: './faculty-create.component.html',
  styleUrls: ['./faculty-create.component.scss']
})
export class FacultyCreateComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private service: FacultyService,
              private router: Router) {
    this.form = this.fb.group({
      name: [null, Validators.required]
    });
  }

  ngOnInit(): void {

  }

  submitForm(): void {
    markFormGroupDirty(this.form);
    if (this.form.valid) {
      this.service.add(this.form.value).subscribe(
        () => this.router.navigate(['/faculty'])
      );
    }
  }
}
