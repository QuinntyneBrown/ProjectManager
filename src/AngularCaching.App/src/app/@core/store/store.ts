import { Injectable } from "@angular/core";
import { guid } from "@core/utilities/guid";
import { Observable } from "rxjs";
import { exhaustMap, filter, shareReplay, startWith, tap } from "rxjs/operators";
import { Dispatcher } from "./dispatcher";

@Injectable({
  providedIn: "root"
})
export class Store {
  private readonly _inner: Map<string, Observable<any>> = new Map();
  private readonly _invalidations: Map<string, string[]> = new Map();
  private readonly _id = guid();

  constructor(private readonly _dispatcher: Dispatcher) {
    _dispatcher.actions$
      .pipe(
        filter(x => {
          if(!Array.isArray(x) && x.indexOf(this._id) > -1) {
            return false;
          }
          return true;
        }),
        tap(action => {
          let actions: string[] = Array.isArray(action) ? (action as string[]) : [action as string];

          let aggregateKeys = [];

          for (var i = 0; i < actions.length; i++) {
            aggregateKeys = aggregateKeys.concat(this._invalidations.get(actions[i]));
          }

          for (var i = 0; i < aggregateKeys.length; i++) {
            this._inner.set(aggregateKeys[i], null);
          }

          for (var i = 0; i < actions.length; i++) {
            _dispatcher.emit(`${actions[i]}:${this._id}`);
          }
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

  public fromStoreOrServiceWithRefresh$<T>(key: string, func: any, action: string | string[] = []): Observable<T> {
    action = Array.isArray(action) ? action : [action];

    for (var i = 0; i < action.length; i++) {
      this._register(key, action[i]);
    }

    return this._dispatcher.actions$.pipe(
      filter((x:string) => {
        return !Array.isArray(x) && (action as string[]).map(j => `${j}:${this._id}`).indexOf(x) > -1;
      }),
      startWith(action[0]),
      exhaustMap(_ => this._fromStoreOrService$<T>(key, func))
    );
  }

  private _register(key: string, invalidateOn: string) {
    var keys = this._invalidations.get(invalidateOn);
    keys = keys || [];
    if (keys.filter(x => x == key)[0] == null) {
      keys.push(key);
    }
    this._invalidations.set(invalidateOn, keys);
  }
}
