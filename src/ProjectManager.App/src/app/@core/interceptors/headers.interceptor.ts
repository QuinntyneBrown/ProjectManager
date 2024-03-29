import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@core/services/local-storage.service';
import { accessTokenKey } from '@core/constants';


@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(
    private readonly _localStorageService: LocalStorageService)
    { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._localStorageService.get({ name: accessTokenKey }) || '';

    return next.handle(request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${token}`)
    }));
  }
}
