import { Component, OnInit } from '@angular/core';
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
    map(project => ({ project }))
  );

  constructor(
    private readonly _currentUserProject: CurrentUserProject
  ) {

  }

}
