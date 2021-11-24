import { Inject, Injectable } from "@angular/core";
import { User, UserService } from "@api";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BASE_URL } from "@core/constants";
import { queryStore } from "@quinntyne/query-store";
import { IUserStore } from "@core/abstractions/stores";

@Injectable()
export class UserStore extends queryStore(UserService) implements IUserStore {
  constructor(
    @Inject(BASE_URL) _baseUrl:string,
    _httpClient: HttpClient
  ) {
    super(_baseUrl, _httpClient)
  }

  public getCurrent(): Observable<User> {
    return super.from$(() => super.getCurrent(), ["CURRENT_USER"]);
  }

  public update (options: { user: User }): Observable<{ user: User}> {
    return super.withRefresh(super.update(options), ["CURRENT_USER"]);
  }

  public selectByCacheKey<T>(cacheKey: string): Observable<T> {
    return this.select(cacheKey);
  }
}
