import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from '@api';
import { Destroyable } from '@core';
import { ProjectStore } from '@core';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent extends Destroyable {
  public vm$  = this._projectStore
  .currentUserProject$()
  .pipe(
    map(project => {
      let form = new FormGroup({
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
