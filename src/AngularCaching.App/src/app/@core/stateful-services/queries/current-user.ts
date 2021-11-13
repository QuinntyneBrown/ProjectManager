import { Injectable } from "@angular/core";
import { User, UserService } from "@api";
import { Observable } from "rxjs";
import { Cache } from "@core/stateful-services/cache";

@Injectable({
  providedIn: "root"
})
export class CurrentUser {
  constructor(
    private readonly _cache: Cache,
    private readonly _userService: UserService
  ) { }

  public query(): Observable<User> {
    return this._cache.fromCacheOrServiceWithRefresh$("CURRENT_USER", () => this._userService.getCurrent());
  }
}
