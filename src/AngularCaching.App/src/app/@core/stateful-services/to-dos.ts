import { Injectable } from "@angular/core";
import { ToDo, ToDoService } from "@api";
import { Observable } from "rxjs";
import { Cache } from "./cache";

@Injectable({
  providedIn: "root"
})
export class ToDos {
  constructor(
    private readonly _cache: Cache,
    private readonly _toDoService: ToDoService
  ) { }

  public query(): Observable<ToDo[]> { return this._cache.fromCacheOrService$("TO_DOS", () => this._toDoService.get()); }
}
