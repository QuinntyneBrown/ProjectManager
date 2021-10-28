import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";

@Injectable()
export class Cache {

  protected readonly _cache = new Map<string, Observable<any>>();

  protected _fromCacheOrService$(id:string, func: {(): Observable<any>}): Observable<any> {
    if (!this._cache.get(id)) {
      this._cache.set(
        id,
        func().pipe(shareReplay(1))
      );
    }
    return this._cache.get(id);
  }
}
