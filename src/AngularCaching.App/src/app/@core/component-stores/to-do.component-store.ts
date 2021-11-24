import { Injectable } from "@angular/core";
import { ToDo, ToDoService } from "@api";
import { IToDoStore } from "@core/abstractions/stores";
import { ComponentStore } from "@ngrx/component-store";
import { BehaviorSubject, Observable } from "rxjs";
import { first, mergeMap, shareReplay, switchMap, switchMapTo, tap } from "rxjs/operators";

interface ToDoStoreState {
  toDoById?: Readonly<string>,
  projectName?: Readonly<string>,
  toDo?: Readonly<ToDo>
}

@Injectable()
export class ToDoStore extends ComponentStore<ToDoStoreState> implements IToDoStore {

  private readonly _refreshSubject: BehaviorSubject<void> = new BehaviorSubject(null);

  private readonly _toDoByProjectName$ = this.select(x => x.projectName)
  .pipe(
    switchMap(projectName => this._toDoService.getByProjectName(projectName)),
    shareReplay(1)
  );

  private readonly _toDoById$ = this.select(x => x.toDoById)
  .pipe(
    switchMap(toDoId => this._toDoService.getById({ toDoId })),
    shareReplay(1)
  );

  public getToDosByProjectName(options: { projectName: string }) {
    return this._refreshSubject
    .pipe(
      switchMap(_ => this.select(x => x.projectName)),
      first(),
      tap(projectName => {
        if(projectName != options.projectName) {
          this.setProjectName(options.projectName);
        }
      }),
      switchMap(_ => this._toDoByProjectName$)
    )
  }

  public getToDoById(options: { toDoId }) {
    return this._refreshSubject
    .pipe(
      switchMap(_ => this.select(x => x.toDoById)),
      first(),
      tap(toDoById => {
        if(toDoById != options.toDoId) {
          this.setEntityId(options.toDoId);
        }
      }),
      switchMap(_ => this._toDoById$)
    )
  }

  public create(options: { toDo: ToDo}) {
    return this._toDoService.create(options)
    .pipe(
      tap(_ => this._refreshSubject.next())
    )
  }

  public update(options: { toDo: ToDo}) {
    return this._toDoService.update(options)
    .pipe(
      tap(_ => this._refreshSubject.next())
    )
  }

  public delete(options: { toDo: ToDo}) {
    return this._toDoService.remove(options)
    .pipe(
      tap(_ => this._refreshSubject.next())
    )
  }

  constructor(
    private readonly _toDoService: ToDoService
  ) {
    super({  });
  }

  private readonly setProjectName =
    this.updater<Readonly<string>>(
        (state, projectName) => ({...state, projectName}));

  private readonly setEntityId =
    this.updater<Readonly<string>>(
        (state, toDoById) => ({...state, toDoById}));

  selectByCacheKey<T>(cacheKey: string): Observable<T> {
    throw new Error("Method not implemented.");
  }
}


