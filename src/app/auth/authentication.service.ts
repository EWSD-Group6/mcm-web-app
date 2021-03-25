import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {filter, finalize, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {AuthApiService, AuthzLoginResponse} from '../api';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  currentUser$: BehaviorSubject<AuthzLoginResponse | null> = new BehaviorSubject(null);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private authApiService: AuthApiService,
              private router: Router,
              private nzNotificationService: NzNotificationService) {
    this.token$.next(localStorage.getItem('token'));
    this.currentUser$.next(JSON.parse(localStorage.getItem('user')));
  }

  isLoggedIn(): Observable<boolean> {
    return this.token$.pipe(map(x => !!x));
  }

  login(username, password): void {
    this.setLoading(true);
    this.authApiService.authLoginPost({
      email: username,
      password
    })
      .pipe(
        filter(x => !!x),
        finalize(() => this.setLoading(false))
      )
      .subscribe(data => {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data));
        this.token$.next(data.accessToken);
        this.currentUser$.next(data);
        this.router.navigate(['/']);
      });
  }

  setLoading(v: boolean): void {
    this.isLoading$.next(v);
  }

  logout(): Promise<boolean> {
    localStorage.removeItem('token');
    this.token$.next(null);
    return this.router.navigate(['/login']);
  }

  getToken(): Observable<string> {
    return this.token$.asObservable();
  }

  getCurrentLoggedInUser(): Observable<AuthzLoginResponse> {
    return this.currentUser$.asObservable();
  }
}
