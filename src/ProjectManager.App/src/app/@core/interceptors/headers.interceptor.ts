import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '@core/services/local-storage.service';
import { accessTokenKey } from '@core/constants';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.get({ name: accessTokenKey }) || '';

  const clonedRequest = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  return next(clonedRequest);
};
