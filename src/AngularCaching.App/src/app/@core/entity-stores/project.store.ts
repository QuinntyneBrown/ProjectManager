import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Project, ProjectService } from "@api";
import { Observable } from "rxjs";
import { BASE_URL } from "@core/constants";
import { queryStore } from "@quinntyne/query-store";


@Injectable({
  providedIn: "root"
})
export class ProjectStore extends queryStore(ProjectService) {
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
    return super.withRefresh(super.update(options),["CURRENT_USER_PROJECT"]);
  }
}
