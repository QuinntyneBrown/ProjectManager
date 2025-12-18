import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LocalStorageService, NavigationService } from '@core/services';
import { accessTokenKey } from '@core/constants';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const redirectService = inject(NavigationService);

  return next(req).pipe(
    tap({
      next: () => {},
      error: (error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          localStorageService.put({ name: accessTokenKey, value: null });
          redirectService.redirectToLogin();
        }
      }
    })
  );
};
