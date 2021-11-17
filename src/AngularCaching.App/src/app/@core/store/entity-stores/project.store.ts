import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Project, ProjectService } from "@api";
import { BASE_URL, storeMixin } from "@core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProjectStore extends storeMixin(ProjectService) {
  constructor(
    @Inject(BASE_URL) _baseUrl:string,
    _httpClient: HttpClient
  ) {
    super(_baseUrl, _httpClient)
  }

  public currentUserProject$(): Observable<Project> {
    return super.from$(() => this.getCurrentUserProject(), ["CURRENT_USER_PROJECT", "CURRENT_USER"]);
  }

  public get$(): Observable<Project> {
    return super.from$(() => this.get(), ["PROJECTS"]);
  }

  public update(options: { project: Project}) {
    return super.update(options)
    .pipe(
      tap(_ => super.refresh("CURRENT_USER_PROJECT"))
    );
  }
}
