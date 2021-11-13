import { Component } from '@angular/core';
import { ToDo } from '@api';
import { NavigationService } from '@core';
import { AuthService } from '@core/services/auth.service';
import { ToDosByProjectName } from '@core/stateful-services';
import { CurrentUser } from '@core/stateful-services/queries/current-user';
import { CurrentUserProject } from '@core/stateful-services/queries/current-user-project';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-project-panel',
  templateUrl: './project-panel.component.html',
  styleUrls: ['./project-panel.component.scss']
})
export class ProjectPanelComponent {

  public vm$ = combineLatest([
    this._currentUser.query(),
    this._currentUserProject.query()
  ])
  .pipe(
    switchMap(([user, project]) => {
      return this._toDosByProjectName.query(user.currentProjectName)
      .pipe(
        map(toDos => ({ toDos, user, project }))
      )
    })
  );

  constructor(
    private readonly _currentUser: CurrentUser,
    private readonly _toDosByProjectName: ToDosByProjectName,
    private readonly _currentUserProject: CurrentUserProject,
    private readonly _authService: AuthService,
    private readonly _navigationService: NavigationService
  ) { }

  public logout() {
    this._authService.tryToLogout();
    this._navigationService.redirectToLogin();
  }
}
