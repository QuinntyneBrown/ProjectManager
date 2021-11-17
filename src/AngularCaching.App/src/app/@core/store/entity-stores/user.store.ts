import { Inject, Injectable } from "@angular/core";
import { User, UserService } from "@api";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { store } from "../store";
import { BASE_URL } from "@core/constants";

@Injectable({
  providedIn: "root"
})
export class UserStore extends store(UserService) {
  constructor(
    @Inject(BASE_URL) _baseUrl:string,
    _httpClient: HttpClient
  ) {
    super(_baseUrl, _httpClient)
  }

  public getCurrent(): Observable<User> {
    return super.from$(() => super.getCurrent(), "CURRENT_USER");
  }

  public update (options: { user: User }): Observable<{ user: User}> {
    return super.update(options)
    .pipe(
      tap(_ => super.refresh("CURRENT_USER"))
    );
  }
}
