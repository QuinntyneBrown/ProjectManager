import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { accessTokenKey } from '@core/constants';
import { LocalStorageService, NavigationService } from '@core/services';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _localStorageService: LocalStorageService,
    private readonly _navigationService: NavigationService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this._localStorageService.get({ name: accessTokenKey });
      if (token) {
        return true;
      }

      this._navigationService.lastPath = state.url;
      this._navigationService.redirectToLogin();

      return false;
  }
}
