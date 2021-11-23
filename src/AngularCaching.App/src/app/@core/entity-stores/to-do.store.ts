import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ToDo, ToDoService } from "@api";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BASE_URL } from "@core/constants";
import { queryStore } from "@quinntyne/query-store";


@Injectable({
  providedIn: "root"
})
export class ToDoStore extends queryStore(ToDoService) {
  constructor(
    @Inject(BASE_URL) _baseUrl:string,
    _httpClient: HttpClient
  ) {
    super(_baseUrl, _httpClient)
  }

  public toDoById(id:string): Observable<ToDo> { return super.from$(() => super.getById({toDoId: id }), `TO_DO_BY_ID_${id}`); }

  public toDosByProjectName(projectName: string): Observable<ToDo[]> {
    const func = () => super.getByProjectName(projectName).pipe(
      map(toDos => toDos)
    )
    return super.from$<ToDo[]>(func, [`TO_DOS_BY_PROJECT_NAME_${projectName}`, "TO_DOS"]);
  }

  public create(options: { toDo: ToDo }): Observable<{ toDo: ToDo }> {
    return super.withRefresh(super.create(options),["TO_DOS"]);
  }

  public update(options: { toDo: ToDo }): Observable<{ toDo: ToDo }> {
    return super.withRefresh(super.update(options),[`TO_DO_BY_ID_${options.toDo.toDoId}`, "TO_DOS"]);
  }

  public delete(options: { toDo: ToDo }): Observable<void> {
    return super.withRefresh(super.remove(options),["TO_DOS"]);
  }
}
