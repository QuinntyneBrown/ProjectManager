import { Injectable } from "@angular/core";
import { ToDo, ToDoService } from "@api";
import { Observable } from "rxjs";
import { Cache } from "@core/stateful-services/cache";
import { TO_DOS_CHANGED } from "../actions";

@Injectable({
  providedIn: "root"
})
export class ToDosByProjectName {
  constructor(
    private readonly _cache: Cache,
    private readonly _toDoService: ToDoService
  ) { }

  public query(projectName: string): Observable<ToDo[]> { return this._cache.fromCacheOrServiceWithRefresh$(TO_DOS_CHANGED, () => this._toDoService.getByProjectName(projectName), TO_DOS_CHANGED); }
}
