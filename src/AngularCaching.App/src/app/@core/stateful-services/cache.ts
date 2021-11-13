import { Injectable } from "@angular/core";
import { Logger } from "@core/services/logger";
import { Observable } from "rxjs";
import { filter, finalize, shareReplay, startWith, switchMap, tap } from "rxjs/operators";
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
          _dispatcher.emit(action, true);
        })
      )
      .subscribe();
  }

  public fromCacheOrService$(key: string, func: { (): Observable<any> }): Observable<any> {
    if (!this._inner.get(key)) {
      this._inner.set(key, func().pipe(shareReplay(1)));
    }
    return this._inner.get(key);
  }

  public fromCacheOrServiceWithRefresh$(key: string, func: any, action: string) {
    this.register(key, action);

    return this._dispatcher.refreshStream$.pipe(
      tap(action => this._logger.trace(`${action} action dispatched to the refresh stream`)),
      filter(action => action == action),
      startWith(action),
      switchMap(_ => {
        if (this._processing.get(key) != null) return this._processing.get(key);

        this._logger.trace(`${key} processing cache miss`);

        this._processing.set(key, this.fromCacheOrService$(key, func).pipe(finalize(() => this._processing.set(key, null))));

        return this._processing.get(key);
      })
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
