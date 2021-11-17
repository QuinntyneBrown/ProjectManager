import { Injectable } from "@angular/core";
import { User, UserService } from "@api";
import { isNonNull } from "@core/utilities/is-non-null";
import { ComponentStore } from "@ngrx/component-store";
import { BehaviorSubject } from "rxjs";
import { filter, shareReplay, switchMap, tap } from "rxjs/operators";

interface UserState {
  readonly currentUser?: Readonly<User>;
}

@Injectable({
  providedIn:"root"
})
export class UserComponentStore extends ComponentStore<UserState> {

  private readonly _refresh$: BehaviorSubject<void> = new BehaviorSubject(null);

  constructor(
    private readonly _userService: UserService
  ) {
    super({ })
  }

  readonly currentUser$ = this._refresh$.pipe(
    tap(() => this.getCurrentUser()),
    switchMap(() => this.select(state => state.currentUser)),
    filter(isNonNull),
    shareReplay(1));

  private readonly getCurrentUser = this.effect<void>(
    obs$ => obs$.pipe(
        switchMap(() => this._userService.getCurrent()),
        tap((user: User) => this.updateCurrentUser(user)),
        ));

  private readonly updateCurrentUser =
      this.updater<Readonly<User>>(
          (state, currentUser) => {
            return {...state, currentUser};
          });

  public update (options: { user: User }) {
    return this._userService.update(options)
    .pipe(
      tap(_ => this._refresh$.next())
    );
  }
}
