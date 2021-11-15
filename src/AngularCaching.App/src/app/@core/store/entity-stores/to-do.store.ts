import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ToDo, ToDoService } from "@api";
import { BASE_URL } from "@core";
import { Dispatcher, Store } from "@core/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { TO_DOS_CHANGED } from "../actions";


@Injectable({
  providedIn: "root"
})
export class ToDoStore extends ToDoService {
  constructor(
    @Inject(BASE_URL) _baseUrl:string,
    _httpClient: HttpClient,
    private readonly _store: Store,
    private readonly _dispatcher: Dispatcher
  ) {
    super(_baseUrl, _httpClient)
  }

  public toDoById(id:string): Observable<ToDo[]> { return this._store.fromStoreOrServiceWithRefresh$(`TO_DO_BY_ID_${id}`, () => this.getById({toDoId: id }), `TO_DO_BY_ID_${id}`); }

  public toDoByProjectName(projectName: string): Observable<ToDo[]> {
    const func = () => this.getByProjectName(projectName);

    return this._store.fromStoreOrServiceWithRefresh$<ToDo[]>(`TO_DOS_BY_PROJECT_NAME_${projectName}`, func, [TO_DOS_CHANGED]);
  }

  public create(options: { toDo: ToDo }): Observable<{ toDo: ToDo }> {
    return super.create(options)
    .pipe(
      tap(_ => this._dispatcher.emit([`TO_DO_BY_ID_${options.toDo.toDoId}`, TO_DOS_CHANGED]))
    )
  }

  public update(options: { toDo: ToDo }): Observable<{ toDo: ToDo }> {
    return super.update(options)
    .pipe(
      tap(_ => this._dispatcher.emit([`TO_DO_BY_ID_${options.toDo.toDoId}`, TO_DOS_CHANGED]))
    )
  }
}
