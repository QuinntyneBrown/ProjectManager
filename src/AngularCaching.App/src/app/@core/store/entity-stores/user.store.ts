import { Injectable } from "@angular/core";
import { User, UserService } from "@api";
import { Observable } from "rxjs";
import { CURRENT_USER_CHANGED } from "../actions";
import { Store } from "@core/store";

@Injectable({
  providedIn: "root"
})
export class UserStore {
  constructor(
    private readonly _store: Store,
    private readonly _userService: UserService
  ) { }

  public currentUser(): Observable<User> {
    return this._store.fromStoreOrServiceWithRefresh$("CURRENT_USER", () => this._userService.getCurrent(), CURRENT_USER_CHANGED);
  }
}
