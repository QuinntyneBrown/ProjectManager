import { Injectable } from "@angular/core";
import { Project, ProjectService } from "@api";
import { switchMapByKey } from "@core/abstractions/switch-map-by-key";
import { isNonNull } from '@core/abstractions/is-non-null';
import { ComponentStore } from "@ngrx/component-store";
import { EMPTY, of } from "rxjs";
import { catchError, filter, first, mergeMap, shareReplay, switchMap, tap } from "rxjs/operators";

export interface ProjectStoreState {
  projects?: Project[],
  project?: Project
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

  public getProjectByName(name: string) {
    return of(undefined)
    .pipe(
      tap(_ => this._getProjectByName(name)),
      switchMap(_ => this.select(x => x.project).pipe(filter(isNonNull))
      )
    );
  }

  private _getProjectByName = this.effect<string>(name$ =>
    name$.pipe(
      switchMapByKey(name => name, name => {
        return this.select(x => x.project).pipe(first())
        .pipe(
          switchMap(project => {
            if(project?.name == name) {
              return of(name);
            }
            return this._projectService.getByName({ name })
            .pipe(
              tap((project:Project) => this.setState((state) => ({ ...state, project })))
            )
          }),
        );
      }),
      shareReplay(1)
    ))

  public getProjects() {
    return of(undefined)
    .pipe(
      tap(_ => this._getProjects()),
      switchMap(_ => this.select(x => x.projects))
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

  readonly updateProject = this.effect<Project>(project$ => project$.pipe(
    mergeMap(project => {
      return this._projectService.update({ project })
      .pipe(
        tap({
          next: ({ project }) => {
            this.setState((state) => ({...state, project: project }))
          },
          error: () => {

          }
        }),
        catchError(() => EMPTY)
      )
    })
  ));
}
