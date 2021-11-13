import { Injectable } from "@angular/core";
import { Observable, of, ReplaySubject, Subject } from "rxjs";
import { filter, first, groupBy, map, mergeAll, shareReplay, switchMap, tap, toArray } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class Cache {

  protected readonly _cache = new Map<string, Observable<any>>();

  public fromCacheOrService$(key:string, func: {(): Observable<any>}): Observable<any> {
    if (!this._cache.get(key)) {
      this._cache.set(
        key,
        func().pipe(shareReplay(1))
      );
    }
    return this._cache.get(key);
  }
}
