import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { filter, finalize, shareReplay, startWith, switchMap, tap } from "rxjs/operators";
import { Dispatcher } from "./dispatcher";


@Injectable({
  providedIn: "root"
})
export class Store {
  private readonly _inner: Map<string, Observable<any>> = new Map();
  private readonly _processing: Map<string, Observable<any>> = new Map();
  private readonly _invalidations: Map<string, string[]> = new Map();

  constructor(
    private readonly _dispatcher: Dispatcher
    ) {
    _dispatcher.invalidateStream$
      .pipe(
        tap(action => {

          let actions: string[] = Array.isArray(action) ? action as string[] : [action as string];

          let aggregateKeys = [];

          for(var i = 0; i < actions.length; i++) {
            aggregateKeys = aggregateKeys.concat(this._invalidations.get(actions[i]));
          }

          for (var i = 0; i < aggregateKeys.length; i++) {
            this._inner.set(aggregateKeys[i], null);
          }

          for(var i = 0; i < actions.length; i++) {
            _dispatcher.emitRefresh(actions[i]);
          }
        })
      )
      .subscribe();
  }

  public fromStoreOrService$(key: string, func: { (): Observable<any> }): Observable<any> {
    if (this._processing.get(key) != null) return this._processing.get(key);

    if (!this._inner.get(key)) {
      this._inner.set(key, func().pipe(
        shareReplay(1)
        ));
    }

    this._processing.set(key, this._inner.get(key).pipe(finalize(() => this._processing.delete(key))));

    return this._processing.get(key);
  }

  public fromStoreOrServiceWithRefresh$(key: string, func: any, action: string | string[]) {

    action = Array.isArray(action) ? action : [action];

    for(var i = 0; i < action.length; i++) {
      this.register(key,  action[i]);
    }

    return this._dispatcher.refreshStream$.pipe(
      filter(x => (action as string[]).indexOf(x) > -1),
      startWith(action[0]),
      switchMap(_ => this.fromStoreOrService$(key, func))
    );
  }

  public register(key: string, invalidateOn: string) {
    var keys = this._invalidations.get(invalidateOn);
    keys = keys || [];
    if (keys.filter(x => x == key)[0] == null) {
      keys.push(key);
    }
    this._invalidations.set(invalidateOn, keys);
  }
}
