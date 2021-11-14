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

  public query(projectName: string): Observable<ToDo[]> {
    const func = () => this._toDoService.getByProjectName(projectName);
    return this._cache.fromCacheOrServiceWithRefresh$(`TO_DOS_BY_PROJECT_NAME_${projectName}`, func, [TO_DOS_CHANGED]);
  }
}
