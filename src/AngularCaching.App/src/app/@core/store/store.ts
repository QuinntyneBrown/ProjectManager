import { Injectable } from "@angular/core";
import { Action } from "@core/store/actions";
import { Observable } from "rxjs";
import { exhaustMap, filter, shareReplay, startWith, tap } from "rxjs/operators";
import { Dispatcher } from "./dispatcher";


@Injectable({
  providedIn: "root"
})
export class Store {
  private readonly _inner: Map<Action, Observable<any>> = new Map();
  private readonly _actionKeysMap: Map<Action, string[]> = new Map();

  constructor(
    private readonly _dispatcher: Dispatcher
    ) {
    _dispatcher.invalidateStream$
      .pipe(
        tap(action => {
          const actions: string[] = Array.isArray(action) ? action as string[] : [action as string];
          for(var i = 0; i < actions.length; i++) {
            const keys = this._actionKeysMap.get(actions[i]);
            for(let j = 0; j < keys.length; j++) {
              this._inner.set(keys[j], null);
            }
          }
          actions.forEach(a => _dispatcher.emitRefresh(a));
        })
      )
      .subscribe();
  }

  private _fromStoreOrService$<T>(key: string, func: { (): Observable<T> }): Observable<T> {
    if (!this._inner.get(key)) {
      this._inner.set(key, func().pipe(shareReplay(1)));
    }
    return this._inner.get(key) as Observable<T>;
  }

  public fromStoreOrServiceWithRefresh$<T>(key: string, func: any, action: string | string[]): Observable<T> {
    action = Array.isArray(action) ? action : [action];
    action.forEach(a => this._register(key,a));
    return this._dispatcher.refreshStream$.pipe(
      filter(x => (action as Action[]).indexOf(x) > -1),
      startWith(action[0]),
      exhaustMap(_ => this._fromStoreOrService$<T>(key, func))
    );
  }

  private _register(key: string, action: Action) {
    var keys = this._actionKeysMap.get(action);
    keys = keys || [];
    if (keys.filter(x => x == key)[0] == null) {
      keys.push(key);
    }
    this._actionKeysMap.set(action, keys);
  }
}
