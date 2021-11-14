import { Injectable } from "@angular/core";
import { Logger } from "@core/services/logger";
import { Observable } from "rxjs";
import { concatMap, filter, finalize, shareReplay, startWith, switchMap, tap } from "rxjs/operators";
import { Dispatcher } from "./dispatcher";


@Injectable({
  providedIn: "root"
})
export class Cache {
  private readonly _inner: Map<string, Observable<any>> = new Map();
  private readonly _processing: Map<string, Observable<any>> = new Map();
  private readonly _invalidations: Map<string, string[]> = new Map();

  constructor(
    private readonly _dispatcher: Dispatcher,
    private readonly _logger: Logger
    ) {
    _dispatcher.invalidateStream$
      .pipe(
        tap(action => {
          this._logger.trace(`${action} action dispatched to the invalidate stream`);

          let keys = this._invalidations.get(action);

          for (var i = 0; i < keys.length; i++) {
            this._inner.set(keys[i], null);
          }
          _dispatcher.emitRefresh(action, true);
        })
      )
      .subscribe();
  }

  public fromCacheOrService$(key: string, func: { (): Observable<any> }): Observable<any> {
    if (this._processing.get(key) != null) return this._processing.get(key);

    if (!this._inner.get(key)) {
      this._inner.set(key, func().pipe(shareReplay(1)));
    }

    this._processing.set(key, this._inner.get(key).pipe(finalize(() => this._processing.delete(key))));

    return this._processing.get(key);
  }

  public fromCacheOrServiceWithRefresh$(key: string, func: any, action: string | string[]) {

    action = Array.isArray(action) ? action : [action];

    for(var i = 0; i < action.length; i++) {
      this.register(key,  action[i]);
    }


    return this._dispatcher.refreshStream$.pipe(
      tap(x => this._logger.trace(`${x} action dispatched to the refresh stream`)),
      filter(x => {
        return (action as string[]).indexOf(x) > -1
      }),
      startWith(action[0]),
      switchMap(_ => this.fromCacheOrService$(key, func))
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
