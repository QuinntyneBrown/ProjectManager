import { Inject, Injectable } from "@angular/core";
import { User, UserService } from "@api";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BASE_URL, storeMixin } from "@core";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserStore extends storeMixin(UserService) {
  constructor(
    @Inject(BASE_URL) _baseUrl:string,
    _httpClient: HttpClient
  ) {
    super(_baseUrl, _httpClient)
  }

  public currentUser(): Observable<User> {
    return super.from$(() => super.getCurrent(), "CURRENT_USER");
  }

  public update (options: { user: User }): Observable<{ user: User}> {
    return super.update(options)
    .pipe(
      tap(_ => super.refresh("CURRENT_USER"))
    );
  }
}
