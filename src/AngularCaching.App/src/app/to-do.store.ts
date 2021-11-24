import { Injectable } from "@angular/core";
import { ToDo, ToDoService } from "@api";
import { ComponentStore } from "@ngrx/component-store";
import { BehaviorSubject, EMPTY } from "rxjs";
import { catchError, mergeMap, shareReplay, switchMap, tap } from "rxjs/operators";

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

  private readonly _refresh$: BehaviorSubject<void> = new BehaviorSubject(null);

  constructor(
    private readonly _toDoService: ToDoService
  ) {
    super({ })
  }

  public getToDos() {
    return this._refresh$
    .pipe(
      switchMap(_ => this._toDoService.get()),
      tap(toDos => this.setState((state) => ({...state, toDos }))),
      switchMap(_ => this.select(x => x.toDos)),
      shareReplay(1)
    )
  }

  public getToDoById(toDoId: string) {
    return this._refresh$
    .pipe(
      switchMap(_ => this._toDoService.getById({ toDoId })),
      tap(toDo => this.setState((state) => ({...state, toDo }))),
      switchMap(_ => this.select(x => x.toDos)),
      shareReplay(1)
    )
  }

  readonly createToDo = this.effect<ToDo>(todo$ => todo$.pipe(
    mergeMap(toDo => {
      return this._toDoService.create({ toDo })
      .pipe(
        tap({
          next:({ toDo }) => {
            this._refresh$.next();
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
            this._refresh$.next()
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
            this.setState((state) => ({...state, toDo: null }))
            this._refresh$.next()
          },
          error: () => {

          }
        }),
        catchError(() => EMPTY)
      )
    })
  ));
}
