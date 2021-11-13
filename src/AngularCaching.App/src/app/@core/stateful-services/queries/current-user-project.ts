import { Injectable } from "@angular/core";
import { User, UserService } from "@api";
import { Observable } from "rxjs";
import { Cache } from "@core/stateful-services/cache";
import { CURRENT_USER_PROJECT_CHANGED } from "../actions";

@Injectable({
  providedIn: "root"
})
export class CurrentUserProject {
  constructor(
    private readonly _cache: Cache,
    private readonly _userService: UserService
  ) { }

  public query(): Observable<User> {
    return this._cache.fromCacheOrServiceWithRefresh$("CURRENT_USER_PROJECT", () => this._userService.getCurrentUserProject(), CURRENT_USER_PROJECT_CHANGED);
  }
}
