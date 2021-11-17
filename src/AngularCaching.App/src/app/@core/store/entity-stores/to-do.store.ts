import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ToDo, ToDoService } from "@api";
import { store } from "../store";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { BASE_URL } from "@core/constants";


@Injectable({
  providedIn: "root"
})
export class ToDoStore extends store(ToDoService) {
  constructor(
    @Inject(BASE_URL) _baseUrl:string,
    _httpClient: HttpClient
  ) {
    super(_baseUrl, _httpClient)
  }

  public toDoById(id:string): Observable<ToDo[]> { return super.from$(() => super.getById({toDoId: id }), `TO_DO_BY_ID_${id}`); }

  public toDoByProjectName(projectName: string): Observable<ToDo[]> {
    const func = () => super.getByProjectName(projectName).pipe(
      map(toDos => {
        return toDos;
      })
    )

    return super.from$<ToDo[]>(func, [`TO_DOS_BY_PROJECT_NAME_${projectName}`, "TO_DOS"]);
  }

  public create(options: { toDo: ToDo }): Observable<{ toDo: ToDo }> {
    return super.create(options)
    .pipe(
      tap(_ => super.refresh(["TO_DOS"]))
    )
  }

  public update(options: { toDo: ToDo }): Observable<{ toDo: ToDo }> {
    return super.update(options)
    .pipe(
      tap(_ => super.refresh([`TO_DO_BY_ID_${options.toDo.toDoId}`, "TO_DOS"]))
    )
  }
}
