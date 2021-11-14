import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dispatcher } from '@core';
import { CurrentUserProject } from '@core/stateful-services/queries/current-user-project';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent {
  public vm$  = this._currentUserProject
  .query()
  .pipe(
    map(project => {
      let form = new FormGroup({
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
    private readonly _dispatcher: Dispatcher
  ) { }

}
