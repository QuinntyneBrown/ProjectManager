import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from '@api';
import { Destroyable, ProjectStore, UserStore } from '@core';
import { map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProjectComponent extends Destroyable {
  public vm$  = this._userStore
  .select(x => x.currentUser)
  .pipe(
    // get by project name
    switchMap(currentUser => this._projectStore.getProjectByName(currentUser.currentProjectName)),
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
    private readonly _projectStore: ProjectStore,
    private readonly _userStore: UserStore
  ) {
    super();
  }

  public handleSaveClick(project: Project) {
    this._projectStore.updateProject(project);
  }
}
