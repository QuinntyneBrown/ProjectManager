import { Injectable } from "@angular/core";
import { Project } from "@api/models/project";
import { ProjectStore } from "@core/store/entity-stores/project.store";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AnalyticsService {
  constructor(
    _projectStore: ProjectStore
  ) {
    _projectStore.select<Project>('CURRENT_USER_PROJECT')
    .pipe(
      map(x => x?.name),
      tap(name => {
        console.log(name);
      })
    ).subscribe();
  }
}
