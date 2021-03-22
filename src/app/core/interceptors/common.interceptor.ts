import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor(private notificationService: NzNotificationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err instanceof HttpErrorResponse && err.status === 0) {
        this.notificationService.error('Error', 'Please check your internet connection', {
          nzDuration: 3000
        });
      }
      if (err instanceof HttpErrorResponse) {
        if (Array.isArray(err.error.message)) {
          this.notificationService.error('Error', err.error.message.join('/n'), {
            nzDuration: 3000
          });
        } else {
          this.notificationService.error('Error', err.error.message, {
            nzDuration: 3000
          });
        }
      }
      return throwError(err);
    }));
  }
}
