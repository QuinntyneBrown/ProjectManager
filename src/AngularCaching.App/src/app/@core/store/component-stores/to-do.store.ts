import { Injectable } from "@angular/core";
import { ToDo, ToDoService } from "@api";
import { switchMapByKey } from "@core/abstractions/switch-map-by-key";
import { isNonNull } from "@core/utilities/is-non-null";
import { ComponentStore } from "@ngrx/component-store";
import { EMPTY, merge, of, Subject } from "rxjs";
import { catchError, filter, first, mergeMap, shareReplay, switchMap, tap } from "rxjs/operators";

export interface ToDoStoreState {
  toDosByProjectName: ToDo[],
  toDo: ToDo
}

@Injectable({
  providedIn: "root"
})
export class ToDoStore extends ComponentStore<ToDoStoreState> {

  private readonly _refresh$: Subject<void> = new Subject();

  constructor(
    private readonly _toDoService: ToDoService
  ) {
    super({ toDosByProjectName: null, toDo: {} as ToDo })
  }

  public toDoByProjectName(projectName: string) {
    return merge(of(undefined),this._refresh$)
    .pipe(
      tap(_ => this._getByProjectName(projectName)),
      switchMap(_ => this.select(x => x.toDosByProjectName).pipe(filter(isNonNull)))
    )
  }

  public toDoById(toDoId: string) {
    return of(undefined)
    .pipe(
      tap(_ => this._getToDoById(toDoId)),
      switchMap(_ => this.select(x => x.toDo))
    );
  }

  private _getByProjectName = this.effect<string>(projectName$ =>
    projectName$.pipe(
      switchMapByKey(projectName => projectName, projectName => {
        return this.select(x => x.toDosByProjectName).pipe(first())
        .pipe(
          switchMap(toDos => {
            return this._toDoService.getByProjectName(projectName)
            .pipe(
              tap((toDosByProjectName:ToDo[]) => this.setState((state) => ({ ...state, toDosByProjectName })))
            )
          }),
        );
      }),
      shareReplay(1)
    ))

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

  readonly create = this.effect<ToDo>(toDo$ => toDo$.pipe(
    mergeMap(toDo => {
      return this._toDoService.create({ toDo })
      .pipe(
        tap({
          next:({ toDo }) => {
            this.setState((state) => ({...state, toDo }));
            this._refresh$.next();
          },
          error: () => {

          }
        }),
        catchError(() => EMPTY)
      )
    })
  ));

  readonly update = this.effect<ToDo>(toDo$ => toDo$.pipe(
    mergeMap(toDo => {
      return this._toDoService.update({ toDo })
      .pipe(
        tap({
          next: ({ toDo }) => {
            this.setState((state) => ({...state, toDo }));
            this._refresh$.next();
          },
          error: () => {

          }
        }),
        catchError(() => EMPTY)
      )
    })
  ));

  readonly removeToDo = this.effect<ToDo>(toDo$ => toDo$.pipe(
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
