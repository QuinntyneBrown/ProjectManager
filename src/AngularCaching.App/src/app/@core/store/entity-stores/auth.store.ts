import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ALL, BASE_URL, Dispatcher, LocalStorageService } from "@core";
import { AuthService } from "@core/services/auth.service";
import { tap } from "rxjs/operators";


@Injectable({
  providedIn:"root"
})
export class AuthStore extends AuthService {
  constructor(
    localStorageService: LocalStorageService,
    @Inject(BASE_URL) _baseUrl:string,
    _client: HttpClient,
    private readonly _dispatcher: Dispatcher
  ) {
    super(_baseUrl, _client, localStorageService)
  }

  public tryToLogout() {
    super.tryToLogout();
    this._dispatcher.emit(ALL);
  }

  public tryToLogin(options: { username: string, password: string }) {
    return super.tryToLogin(options)
    .pipe(
      tap(_ => this._dispatcher.emit(ALL))
    )
  }
}
