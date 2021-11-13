import { Injectable } from "@angular/core";
import { ToDo, ToDoService } from "@api";
import { Cache } from "@core/stateful-services/cache";
import { Observable } from "rxjs";
import { TO_DOS_CHANGED } from "../actions";


@Injectable({
  providedIn: "root"
})
export class ToDoById {
  constructor(
    private readonly _cache: Cache,
    private readonly _toDoService: ToDoService
  ) { }

  public query(id:string): Observable<ToDo[]> { return this._cache.fromCacheOrServiceWithRefresh$(`TO_DO_BY_ID_${id}`, () => this._toDoService.getById({toDoId: id }), TO_DOS_CHANGED); }
}
