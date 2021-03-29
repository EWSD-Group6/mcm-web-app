import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {markFormGroupDirty} from '../../core/form-utils';
import {SessionService} from '../state/session.service';
import {Router} from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-session-create',
  templateUrl: './session-create.component.html',
  styleUrls: ['./session-create.component.scss']
})
export class SessionCreateComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private service: SessionService,
              private router: Router) {
    this.form = this.fb.group({
      openTime: [null, Validators.required],
      closureTime: [null, Validators.required],
      finalClosureTime: [null, Validators.required],
      rangeTime: [null, Validators.required],
    });
    this.form.get('rangeTime').valueChanges.pipe(untilDestroyed(this)).subscribe(value => {
      this.form.patchValue({
        openTime: value[0],
        closureTime: value[1],
      }, {emitEvent: false});
    });
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    markFormGroupDirty(this.form);
    if (this.form.valid) {
      this.service.add(this.form.value).subscribe(
        () => this.router.navigate(['/contribute-session']),
      );
    }
  }
}
