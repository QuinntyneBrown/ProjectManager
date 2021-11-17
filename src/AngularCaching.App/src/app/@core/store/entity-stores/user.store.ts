import { Inject, Injectable } from "@angular/core";
import { User, UserService } from "@api";
import { Observable } from "rxjs";
import { CURRENT_USER as CURRENT_USER } from "../actions";
import { Dispatcher, Store } from "@core/store";
import { HttpClient } from "@angular/common/http";
import { BASE_URL } from "@core";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserStore extends UserService {
  constructor(
    @Inject(BASE_URL) _baseUrl:string,
    _httpClient: HttpClient,
    private readonly _store: Store,
    private readonly _dispatcher: Dispatcher
  ) {
    super(_baseUrl, _httpClient)
  }

  public currentUser(): Observable<User> {
    return this._store.from$(() => this.getCurrent(), CURRENT_USER);
  }

  public update (options: { user: User }): Observable<{ user: User}> {
    return super.update(options)
    .pipe(
      tap(_ => this._dispatcher.emit(CURRENT_USER))
    );
  }
}
