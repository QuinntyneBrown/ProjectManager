import { Injectable } from "@angular/core";
import { ToDo, ToDoService } from "@api";
import { Store } from "@core/store";
import { Observable } from "rxjs";
import { TO_DOS_CHANGED } from "../actions";


@Injectable({
  providedIn: "root"
})
export class ToDoStore {
  constructor(
    private readonly _store: Store,
    private readonly _toDoService: ToDoService
  ) { }

  public toDoById(id:string): Observable<ToDo[]> { return this._store.fromStoreOrServiceWithRefresh$(`TO_DO_BY_ID_${id}`, () => this._toDoService.getById({toDoId: id }), TO_DOS_CHANGED); }

  public toDoByProjectName(projectName: string): Observable<ToDo[]> {
    const func = () => this._toDoService.getByProjectName(projectName);
    return this._store.fromStoreOrServiceWithRefresh$(`TO_DOS_BY_PROJECT_NAME_${projectName}`, func, [TO_DOS_CHANGED]);
  }
}
