import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BASE_URL } from "@core/constants";
import { AuthService } from "@core/services/auth.service";
import { LocalStorageService } from "@core/services/local-storage.service";
import { Observable, of } from "rxjs";
import { LogoutAction } from "../actions";
import { store } from "../store";


@Injectable({
  providedIn:"root"
})
export class AuthStore extends store(AuthService) {
  constructor(
    localStorageService: LocalStorageService,
    @Inject(BASE_URL) _baseUrl:string,
    _client: HttpClient
  ) {
    super(_baseUrl, _client, localStorageService)
  }

  public tryToLogout() {
    this.withRefresh(of(super.tryToLogout()),[LogoutAction])
      .subscribe();
  }

  public tryToLogin(options: { username: string, password: string }): Observable<any> {
    return super.tryToLogin(options);
  }
}
