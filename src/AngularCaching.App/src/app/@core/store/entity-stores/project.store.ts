import { Injectable } from "@angular/core";
import { Project, ProjectService } from "@api";
import { Store } from "@core/store";
import { Observable } from "rxjs";
import { CURRENT_USER_CHANGED, CURRENT_USER_PROJECT_CHANGED } from "../actions";

@Injectable({
  providedIn: "root"
})
export class ProjectStore {
  constructor(
    private readonly _store: Store,
    private readonly _projectService: ProjectService
  ) { }

  public currentUserProject(): Observable<Project> {
    return this._store.fromStoreOrServiceWithRefresh$("CURRENT_USER_PROJECT", () => this._projectService.getCurrentUserProject(), [CURRENT_USER_PROJECT_CHANGED, CURRENT_USER_CHANGED]);
  }
}
