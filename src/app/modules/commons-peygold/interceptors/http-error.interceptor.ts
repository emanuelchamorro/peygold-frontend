import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import {OK} from 'http-status-codes';
import {ErrorResponse} from '../entities/error-response';

export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Hack for pass the not valid json response.
          if (error.status === OK) {
            return throwError(new ErrorResponse('' , error.status, error.ok));
          }
          if (!error.error) {
            return throwError(new ErrorResponse(error.message , error.status, error.ok));
          }
          if (error.error instanceof ErrorEvent) {
            return throwError(new ErrorResponse(error.error.message, error.status, error.ok));
          }
          if (error.status === 0 && error.statusText) {
            return throwError(new ErrorResponse(error.statusText, error.status, error.ok));
          }
          return throwError(new ErrorResponse(error.error.toString(), error.status, error.ok));
        })
      );
  }
}
