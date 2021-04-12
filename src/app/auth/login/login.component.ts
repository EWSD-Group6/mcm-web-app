import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;
  loading$: Observable<boolean>;

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService) {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
    this.loading$ = this.authService.getLoading();
  }

  login(): void {
    const {username, password} = this.form.value;
    this.authService.login(username, password);
  }
}
