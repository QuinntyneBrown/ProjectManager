import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { tap } from 'rxjs/operators';
import { accessTokenKey, BASE_URL, usernameKey } from '@core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(BASE_URL) private _baseUrl: string,
    private _httpClient: HttpClient,
    private _localStorageService: LocalStorageService
  ) {}

  public logout() {
    this._localStorageService.put({ name: accessTokenKey, value: null});
    this._localStorageService.put({ name: usernameKey, value: null });
  }

  public tryToLogin(options: { username: string; password: string }) {
    return this._httpClient.post<any>(`${this._baseUrl}api/user/token`, options)
    .pipe(
      tap(response => {
        this._localStorageService.put({ name: accessTokenKey, value: response.accessToken });
        this._localStorageService.put({ name: usernameKey, value: options.username});
      })
    );
  }

  public tryToLogout() {
    this._localStorageService.put({ name: accessTokenKey, value: null });
    this._localStorageService.put({ name: usernameKey, value: null });
  }
}
