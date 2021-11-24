import { User } from "@api";
import { IUserStore } from "@core/abstractions/stores";
import { ComponentStore } from "@ngrx/component-store";
import { BehaviorSubject, Observable } from "rxjs";

interface IUserStoreState {

}

export class UserStore extends ComponentStore<IUserStoreState> implements IUserStore {

  private readonly _refreshSubject: BehaviorSubject<void> = new BehaviorSubject(null);

  getCurrent(): Observable<User> {
    throw new Error("Method not implemented.");
  }
  update(options: { user: User; }): Observable<{ user: User; }> {
    throw new Error("Method not implemented.");
  }

}
