import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Project, ProjectService } from "@api";
import { BASE_URL, Dispatcher } from "@core";
import { Store } from "@core/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { CURRENT_USER, CURRENT_USER_PROJECT, PROJECTS } from "../actions";

@Injectable({
  providedIn: "root"
})
export class ProjectStore extends ProjectService {
  constructor(
    @Inject(BASE_URL) _baseUrl:string,
    _httpClient: HttpClient,
    private readonly _store: Store,
    private readonly _dispatcher: Dispatcher
  ) {
    super(_baseUrl, _httpClient)
  }

  public currentUserProject$(): Observable<Project> {
    return this._store.from$(() => this.getCurrentUserProject(), [CURRENT_USER_PROJECT, CURRENT_USER]);
  }

  public get$(): Observable<Project> {
    return this._store.from$(() => this.get(), [PROJECTS]);
  }

  public update(options: { project: Project}) {
    return super.update(options)
    .pipe(
      tap(_ => this._dispatcher.emit(CURRENT_USER_PROJECT))
    );
  }
}
