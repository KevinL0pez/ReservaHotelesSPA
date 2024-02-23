import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, finalize, map, timeout } from 'rxjs/operators';
import { HttpError } from '../models/http-error';
import { environment } from '@env/environment';
import { ISafeAny } from '@sharedModule/models/ISafeAny';

const APP_XHR_TIMEOUT = 120000;

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<ISafeAny>, next: HttpHandler): Observable<HttpEvent<ISafeAny>> {
    return next.handle(this.performRequest(req)).pipe(
      timeout(APP_XHR_TIMEOUT),
      map(res => this.handleSuccessfulResponse(res)),
      catchError(err => this.handleErrorResponse(err)),
      finalize(this.handleRequestCompleted.bind(this))
    );
  }

  private getAdditionalHeaders(headers?: HttpHeaders): {
    [name: string]: string;
  } {
    const res: { [name: string]: string } = {};
    if (!headers?.has('x-funcionalidad')) {
      res['x-funcionalidad'] = '';
    }
    return res;
  }

  private performRequest(req: HttpRequest<ISafeAny>): HttpRequest<ISafeAny> {
    let headers: HttpHeaders = req.headers;
    headers = headers.set('x-funcionalidad', `RNCExamenes`);

    // Prefijo de servidor unificado
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      const { baseUrl } = environment.api;
      url = baseUrl + (baseUrl.endsWith('/') && url.startsWith('/') ? url.substring(1) : url);
    }

    return req.clone({ url, setHeaders: this.getAdditionalHeaders(headers) });
  }

  private handleSuccessfulResponse(event: ISafeAny): HttpResponse<ISafeAny> {
    // console.log('response at interceptor', event);

    if (event instanceof HttpResponse) {
      event = event.clone({ body: event.body.response });
    }
    return event;
  }

  private handleErrorResponse(errorResponse: ISafeAny): Observable<HttpEvent<ISafeAny>> {
    // console.log('error at interceptor', errorResponse);

    if (errorResponse instanceof TimeoutError) {
      return throwError(() => 'Timeout Exception');
    }
    console.log('BASE_FRONT', errorResponse);
    switch (errorResponse.status) {
      case 401: // Unauthorized
        console.log('Sesión vencida!!!, redirecciona al Login');
        break;
      case 404:
      case 500:
        return throwError(() => errorResponse);
      case 503: // Internal Server Error
        break;
      default: // Other Error
    }

    let customError = new HttpError();
    try {
      customError = HttpError.initWithCode(errorResponse.error.errors[0].code);
    } catch (e) {
      console.log(e);
    }

    return throwError(() => customError);
  }

  private handleRequestCompleted(): void {
    // console.log(`Request finished`);
  }
}
