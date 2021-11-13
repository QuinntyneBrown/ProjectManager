import { Injectable } from "@angular/core";
import { ToDo, ToDoService } from "@api";
import { Observable } from "rxjs";
import { Cache } from "@core/stateful-services/cache";
import { TO_DOS_CHANGED } from "../actions";

@Injectable({
  providedIn: "root"
})
export class ToDos {
  constructor(
    private readonly _cache: Cache,
    private readonly _toDoService: ToDoService
  ) { }

  public query(): Observable<ToDo[]> { return this._cache.fromCacheOrServiceWithRefresh$(TO_DOS_CHANGED, () => this._toDoService.get(), TO_DOS_CHANGED); }
}
