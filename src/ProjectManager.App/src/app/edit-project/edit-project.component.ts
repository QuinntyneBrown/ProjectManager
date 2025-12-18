import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Project } from '@api';
import { Destroyable, ProjectStore, UserStore } from '@core';
import { map, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    RouterLink
  ],
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

  public handleSaveClick(project: any) {
    if (project.projectId && project.name && project.dueDate) {
      this._projectStore.updateProject(project as Project);
    }
  }
}
