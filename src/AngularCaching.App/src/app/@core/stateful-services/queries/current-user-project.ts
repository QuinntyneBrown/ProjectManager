import { Injectable } from "@angular/core";
import { ProjectService, User } from "@api";
import { Observable } from "rxjs";
import { Cache } from "@core/stateful-services/cache";
import { CURRENT_USER_PROJECT_CHANGED } from "../actions";

@Injectable({
  providedIn: "root"
})
export class CurrentUserProject {
  constructor(
    private readonly _cache: Cache,
    private readonly _projectService: ProjectService
  ) { }

  public query(): Observable<User> {
    return this._cache.fromCacheOrServiceWithRefresh$("CURRENT_USER_PROJECT", () => this._projectService.getCurrentUserProject(), CURRENT_USER_PROJECT_CHANGED);
  }
}
