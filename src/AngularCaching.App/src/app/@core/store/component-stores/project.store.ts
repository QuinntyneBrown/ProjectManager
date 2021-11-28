import { Injectable } from "@angular/core";
import { Project, ProjectService } from "@api";
import { switchMapByKey } from "@core/abstractions/switch-map-by-key";
import { ComponentStore } from "@ngrx/component-store";
import { EMPTY, of } from "rxjs";
import { catchError, first, mergeMap, shareReplay, switchMap, tap } from "rxjs/operators";

export interface ProjectStoreState {
  projects?: Project[],
  currentUserProject?: Project
}

@Injectable({
  providedIn: "root"
})
export class ProjectStore extends ComponentStore<ProjectStoreState> {

  constructor(
    private readonly _projectService: ProjectService
  ) {
    super({ })
  }

  public getProjects() {
    return of(undefined)
    .pipe(
      tap(_ => this._getProjects()),
      switchMap(_ => this.select(x => x.projects))
    )
  }

  public getCurrentUserProject() {
    return of(undefined)
    .pipe(
      tap(_ => this._getCurrentUserProject()),
      switchMap(_ => this.select(x => x.currentUserProject))
    )
  }

  private readonly _getProjects = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(_ => this.select(x => x.projects).pipe(first())
      .pipe(
        switchMap(projects => {
          if(projects === undefined) {
            return this._projectService.get()
            .pipe(
              tap(projects => this.setState((state) => ({...state, projects }))),
            );
          }
          return of(projects);
        }),
      )),
      shareReplay(1)
    ));

  private readonly _getCurrentUserProject = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(_ => this.select(x => x.currentUserProject).pipe(first())
      .pipe(
        switchMap(currentUserProject => {
          if(currentUserProject === undefined) {
            return this._projectService.getCurrentUserProject()
            .pipe(
              tap(project => this.setState((state) => ({...state, currentUserProject: project }))),
            );
          }
          return of(currentUserProject);
        }),
      )),
      //shareReplay(1)
    ));

  readonly updateProject = this.effect<Project>(project$ => project$.pipe(
    mergeMap(project => {
      return this._projectService.update({ project })
      .pipe(
        tap({
          next: ({ project }) => {
            this.setState((state) => ({...state, currentUserProject: project }))
          },
          error: () => {

          }
        }),
        catchError(() => EMPTY)
      )
    })
  ));
}
