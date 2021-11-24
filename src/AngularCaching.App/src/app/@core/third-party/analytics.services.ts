import { Inject, Injectable } from "@angular/core";
import { Project } from "@api/models/project";
import { IProjectStore, PROJECT_STORE } from "@core/abstractions/stores";
import { ProjectStore } from "@core/entity-stores/project.store";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AnalyticsService {
  constructor(
    @Inject(PROJECT_STORE) _projectStore: IProjectStore
  ) {

  }
}
