import { Injectable } from "@angular/core";
import { ToDo, ToDoService } from "@api";
import { ComponentStore } from "@ngrx/component-store";
import { EMPTY, Observable, of, OperatorFunction } from "rxjs";
import { catchError, first, groupBy, ignoreElements, map, mergeAll, mergeMap, shareReplay, switchMap, tap, timeoutWith } from "rxjs/operators";

function switchMapByKey<T, V>(
  keySelector: (item: T) => number | string,
  mapFn: (item: T) => Observable<V>
): OperatorFunction<T, V> {
  return observable$ =>
    observable$.pipe(
      groupBy(
        keySelector,
        item => item,
        itemsByGroup$ =>
          itemsByGroup$.pipe(
            timeoutWith(15000, EMPTY),
            ignoreElements()
          )
      ),
      map((itemGroup$: Observable<T>) => itemGroup$.pipe(switchMap(mapFn))),
      mergeAll()
    );
}

export function isNonNull<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export interface ToDoStoreState {
  toDos?: ToDo[],
  toDo?: ToDo
}

@Injectable({
  providedIn: "root"
})
export class ToDoStore extends ComponentStore<ToDoStoreState> {

  constructor(
    private readonly _toDoService: ToDoService
  ) {
    super({ })
  }

  private readonly _getToDos = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(_ => this.select(x => x.toDos).pipe(first())
      .pipe(
        switchMap(toDos =>{
          if(toDos === undefined) {
            return this._toDoService.get()
            .pipe(
              tap(toDos => this.setState((state) => ({...state, toDos }))),
            );
          }
          return of(toDos);
        }),
      )),
      shareReplay(1)
    ));

  public getToDos() {
    this._getToDos();
    return this.select(x => x.toDos);
  }

  public getToDoById(toDoId: string) {
    this._getToDoById(toDoId);
    return this.select(x => x.toDo);
  }


  private _getToDoById = this.effect<string>(toDoId$ =>
    toDoId$.pipe(
      switchMapByKey(toDoId => toDoId, toDoId => {
        return this.select(x => x.toDo).pipe(first())
        .pipe(
          switchMap(toDo => {
            if(toDo?.toDoId == toDoId) {
              return of(toDo);
            }
            return this._toDoService.getById({ toDoId })
            .pipe(
              tap((toDo:ToDo) => this.setState((state) => ({ ...state, toDo })))
            )
          }),

        );
      }),
      shareReplay(1)
    ))

  readonly createToDo = this.effect<ToDo>(todo$ => todo$.pipe(
    mergeMap(toDo => {
      return this._toDoService.create({ toDo })
      .pipe(
        tap({
          next:({ toDo }) => {
            this.setState((state) => ({...state, toDo }))
          },
          error: () => {

          }
        }),
        catchError(() => EMPTY)
      )
    })
  ));

  readonly updateToDo = this.effect<ToDo>(todo$ => todo$.pipe(
    mergeMap(toDo => {
      return this._toDoService.create({ toDo })
      .pipe(
        tap({
          next: ({ toDo }) => {
            this.setState((state) => ({...state, toDo }))
          },
          error: () => {

          }
        }),
        catchError(() => EMPTY)
      )
    })
  ));

  readonly deleteToDo = this.effect<ToDo>(todo$ => todo$.pipe(
    mergeMap(toDo => {
      return this._toDoService.remove({ toDo })
      .pipe(
        tap({
          next: _ => {
            this.setState((state) => ({...state, toDo: null }));
          },
          error: () => {

          }
        }),
        catchError(() => EMPTY)
      )
    })
  ));
}
