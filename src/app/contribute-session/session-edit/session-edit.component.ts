import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SessionService} from "../state/session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {markFormGroupDirty} from "../../core/form-utils";
import {map, switchMap} from "rxjs/operators";
import {Session} from "../state/session.model";

@UntilDestroy()
@Component({
  selector: 'app-session-edit',
  templateUrl: './session-edit.component.html',
  styleUrls: ['./session-edit.component.scss']
})
export class SessionEditComponent implements OnInit {
  form: FormGroup;
  session: Session;
  constructor(private fb: FormBuilder,
              private service: SessionService,
              private router: Router,
              private route: ActivatedRoute,
  ) {
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
    this.route.paramMap.pipe(
      untilDestroyed(this),
      map(x => x.get('id')),
      map(Number),
      switchMap(x => this.service.getById(x))
    ).subscribe(
      session => {
        this.session = session;
        this.form.patchValue({
          finalClosureTime: new Date(session.finalClosureTime),
          rangeTime: [new Date(session.openTime), new Date(session.closureTime)],
        });
      },
    );
  }

  submitForm(): void {
    markFormGroupDirty(this.form);
    if (this.form.valid) {
      this.service.update(this.session.id, this.form.value).subscribe(
        () => this.router.navigate(['/contribute-session']),
      );
    }
  }

}
