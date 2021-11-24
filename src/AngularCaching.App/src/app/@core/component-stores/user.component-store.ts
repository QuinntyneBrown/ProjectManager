import { User, UserService } from "@api";
import { IUserStore } from "@core/abstractions/stores";
import { ComponentStore } from "@ngrx/component-store";
import { BehaviorSubject, Observable } from "rxjs";
import { first, shareReplay, switchMap, tap } from "rxjs/operators";

interface IUserStoreState {
  currentUser?: User
}

export class UserStore extends ComponentStore<IUserStoreState> implements IUserStore {

  private readonly _refreshSubject: BehaviorSubject<void> = new BehaviorSubject(null);

  constructor(
    private readonly _userService: UserService
  ) {
    super({ });
  }

  getCurrent(): Observable<User> {
    return this._refreshSubject
    .pipe(
      tap(() => this.fetchCurrentUser()),
      switchMap(() => this.select(x => x.currentUser)),
      shareReplay(1)
    )
  }

  private readonly fetchCurrentUser = this.effect<void>(
    obs$ => obs$.pipe(
      switchMap(_ => this._userService.getCurrent()),
      tap((user:User) => this.setCurrentUser(user))
    )
  )

  update(options: { user: User; }): Observable<{ user: User; }> {
    return this._userService.update(options)
    .pipe(
      tap(x => this._refreshSubject.next())
    )
  }


  private readonly setCurrentUser =
    this.updater<Readonly<User>>(
        (state, currentUser) => ({...state, currentUser}));


  selectByCacheKey<T>(cacheKey: string): Observable<T> {
    throw new Error("Method not implemented.");
  }
}
