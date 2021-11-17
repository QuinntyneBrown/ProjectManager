import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BASE_URL, LocalStorageService } from "@core";
import { AuthService } from "@core/services/auth.service";
import { tap } from "rxjs/operators";


@Injectable({
  providedIn:"root"
})
export class AuthStore extends AuthService {
  constructor(
    localStorageService: LocalStorageService,
    @Inject(BASE_URL) _baseUrl:string,
    _client: HttpClient
  ) {
    super(_baseUrl, _client, localStorageService)
  }

  public tryToLogout() {
    super.tryToLogout();
  }

  public tryToLogin(options: { username: string, password: string }) {
    return super.tryToLogin(options);
  }
}
