import { Injectable } from "@angular/core";
import { Project, ProjectService } from "@api";
import { IProjectStore } from "@core/abstractions/stores";
import { ComponentStore } from "@ngrx/component-store";
import { BehaviorSubject, Observable } from "rxjs";

interface IProjectStoreState {

}


@Injectable()
export class ProjectStore extends ComponentStore<IProjectStoreState> implements IProjectStore {

  private readonly _refreshSubject: BehaviorSubject<void> = new BehaviorSubject(null);

  constructor(
    private readonly _projectService: ProjectService
  ) {
    super();
  }

  getProjects(): Observable<Project[]> {
    throw new Error("Method not implemented.");
  }

  getCurrentUserProject(): Observable<Project> {
    throw new Error("Method not implemented.");
  }

  update(options: { project: Project; }) {
    throw new Error("Method not implemented.");
  }

}
