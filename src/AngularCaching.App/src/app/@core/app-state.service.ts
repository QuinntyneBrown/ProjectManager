import { Injectable } from '@angular/core';
import { ToDoService } from '@api';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { Cache } from './cache';


@Injectable({
  providedIn: 'root'
})
export class AppStateService extends Cache {

  private readonly _refreshEntities$: BehaviorSubject<void> = new BehaviorSubject(null);
  private readonly _refreshEntity$: BehaviorSubject<void> = new BehaviorSubject(null);
  private _entitiesCacheKey:string = "TO_DOS";

  public getEntities$() {
    return this._refreshEntities$
    .pipe(
      tap(_ => this._cache.set(this._entitiesCacheKey, null)),
      switchMap(_ => this._fromCacheOrService$(this._entitiesCacheKey, () => this._toDoService.get()))
    );
  }

  public getEntity$(entityId: string) {
    return this._refreshEntities$
    .pipe(
      tap(_ => this._cache.set(entityId, null)),
      switchMap(_ => this._fromCacheOrService$(entityId, () => this._toDoService.getById({ toDoId: entityId })))
    );
  }


  constructor(
    private readonly _toDoService: ToDoService,
  ) {
    super();
  }

  public refreshEntities() {
    this._refreshEntities$.next();
  }

  public refreshEntity(toDoId: string) {
    this._refreshEntity$.next();
  }
}
