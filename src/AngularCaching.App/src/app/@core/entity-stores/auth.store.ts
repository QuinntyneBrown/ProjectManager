import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { IAuthStore } from "@core/abstractions/stores";
import { BASE_URL } from "@core/constants";
import { AuthService } from "@core/services/auth.service";
import { LocalStorageService } from "@core/services/local-storage.service";
import { queryStore } from "@quinntyne/query-store";
import { Observable, of } from "rxjs";



@Injectable()
export class AuthStore extends queryStore(AuthService) implements IAuthStore {
  constructor(
    localStorageService: LocalStorageService,
    @Inject(BASE_URL) _baseUrl:string,
    _client: HttpClient
  ) {
    super(_baseUrl, _client, localStorageService)
  }

  public tryToLogout() {
    this.withRefresh(of(super.tryToLogout()),[])
      .subscribe();
  }

  public tryToLogin(options: { username: string, password: string }): Observable<any> {
    return super.tryToLogin(options);
  }

  public selectByCacheKey<T>(cacheKey: string): Observable<T> {
    return this.select(cacheKey);
  }
}
