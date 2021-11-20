import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from '@api';
import { Destroyable, ProjectStore } from '@core';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailComponent extends Destroyable {
  public vm$  = this._projectStore
  .getCurrentUserProject()
  .pipe(
    map(project => {
      const form = new FormGroup({
        projectId: new FormControl(project.projectId,[Validators.required]),
        name: new FormControl(project.name,[Validators.required]),
        dueDate: new FormControl(project.dueDate, [Validators.required])
      });
      return {
        project,
        form
      }
    })
  );

  constructor(
    private readonly _projectStore: ProjectStore
  ) {
    super();
  }

  public handleSaveClick(project: Project) {
    this._projectStore.update({ project })
    .pipe(
      takeUntil(this._destroyed$),
    ).subscribe();
  }
}
