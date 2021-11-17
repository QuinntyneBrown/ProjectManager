import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Project, ProjectService } from "@api";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { store } from "../store";
import { BASE_URL } from "@core/constants";


@Injectable({
  providedIn: "root"
})
export class ProjectStore extends store(ProjectService) {
  constructor(
    @Inject(BASE_URL) _baseUrl:string,
    _httpClient: HttpClient
  ) {
    super(_baseUrl, _httpClient)
  }

  public getCurrentUserProject(): Observable<Project> {
    return super.from$(() => super.getCurrentUserProject(), ["CURRENT_USER_PROJECT", "CURRENT_USER"]);
  }

  public get(): Observable<Project[]> {
    return super.from$(() => super.get(), ["PROJECTS"]);
  }

  public update(options: { project: Project}) {
    return super.update(options)
    .pipe(
      tap(_ => super.refresh("CURRENT_USER_PROJECT"))
    );
  }
}
