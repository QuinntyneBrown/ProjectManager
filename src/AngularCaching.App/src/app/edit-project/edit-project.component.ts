import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project, ProjectService } from '@api';
import { Destroyable, Dispatcher } from '@core';
import { CURRENT_USER_PROJECT_CHANGED } from '@core/stateful-services/actions';
import { CurrentUserProject } from '@core/stateful-services/queries/current-user-project';
import { map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent extends Destroyable {
  public vm$  = this._currentUserProject
  .query()
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
    private readonly _currentUserProject: CurrentUserProject,
    private readonly _dispatcher: Dispatcher,
    private readonly _projectService: ProjectService
  ) {
    super();
  }

  public handleSaveClick(project: Project) {
    this._projectService.update({ project })
    .pipe(
      takeUntil(this._destroyed$),
      tap(_ => this._dispatcher.emit(CURRENT_USER_PROJECT_CHANGED))
    ).subscribe();

  }
}
