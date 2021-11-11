import { Injectable } from "@angular/core";
import { ToDo, ToDoService } from "@api";
import { Observable } from "rxjs";
import { Cache } from "./cache";

@Injectable({
  providedIn: "root"
})
export class ToDoById {
  constructor(
    private readonly _cache: Cache,
    private readonly _toDoService: ToDoService
  ) { }

  public query(id:string): Observable<ToDo[]> { return this._cache.fromCacheOrService$(`TO_DO_BY_ID_${id}`, () => this._toDoService.getById({toDoId: id })); }
}
