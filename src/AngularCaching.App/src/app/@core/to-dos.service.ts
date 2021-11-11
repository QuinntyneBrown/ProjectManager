import { Injectable } from '@angular/core';
import { ToDo, ToDoService } from '@api';
import { defer, isObservable, merge, Observable, of, Subject } from 'rxjs';
import { first, map, mergeMap, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToDos {

  public shared$: Observable<any>;
  private httpGet$ = this._toDoService.get();
  public invalidateSubject: Subject<boolean> = new Subject();

  constructor(
    private readonly _toDoService: ToDoService
  ) { }

  public createShared = () => {
    return this.shared$ = this.invalidateSubject
      .pipe(
      switchMap(_ => this.httpGet$),
      shareReplay(1)
    );
  };

  public cachedRefreshable$: Observable<ToDo[]> = this.createShared()
  .pipe(
    first(null, defer(() => this.createShared())),
    mergeMap(d => (isObservable(d) ? d : of(d)))
  );
}
