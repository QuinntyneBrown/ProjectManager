import { Injectable } from '@angular/core';
import { ToDoService } from '@api';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AppStateService {


  private readonly _refreshEntities$: BehaviorSubject<void> = new BehaviorSubject(null);
  private readonly _refreshEntity$: BehaviorSubject<void> = new BehaviorSubject(null);

  private _entitiesCacheKey:string = "TO_DOS";

  public getEntities$() {
    return this._refreshEntities$
    .pipe(
      switchMap(_ => this.fromCacheOrService$(this._entitiesCacheKey, () => this._toDoService.get()))
    );
  }

  public getEntity$(entityId: string) {
    return this._refreshEntities$
    .pipe(
      switchMap(_ => this.fromCacheOrService$(entityId, () => this._toDoService.getById({ toDoId: entityId })))
    );
  }

  private readonly _cache = new Map<string, Observable<any>>();

  protected fromCacheOrService$(id:string, func: {(): Observable<any>}): Observable<any> {
    if (!this._cache.get(id)) {
      this._cache.set(
        id,
        func().pipe(shareReplay(1))
      );
    }
    return this._cache.get(id);
  }

  constructor(
    private readonly _toDoService: ToDoService,
  ) { }

  public refreshEntities() {
    this._cache.set(this._entitiesCacheKey, null);
    this._refreshEntities$.next();
  }

  public refreshEntity(toDoId: string) {
    this._cache.set(toDoId, null);
    this._refreshEntity$.next();
  }
}
