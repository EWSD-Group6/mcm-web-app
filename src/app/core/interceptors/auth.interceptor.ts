import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, map, switchMap, take} from 'rxjs/operators';
import {AuthenticationService} from '../../auth/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getToken().pipe(take(1)).pipe(
      map(x => {
        if (!req.headers.get('Bypass-Interceptor')) {
          return req.clone({
            headers: req.headers.delete('Authorization')
              .append('Authorization', `Bearer ${x}`)
          });
        } else {
          return req;
        }
      }),
      switchMap(authReq => {
        return next.handle(authReq).pipe(
          catchError(err => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
              this.router.navigate(['/login']);
            }
            return throwError(err);
          })
        );
      })
    );
  }
}
