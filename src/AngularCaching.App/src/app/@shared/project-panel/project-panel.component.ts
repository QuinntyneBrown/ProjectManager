import { Component } from '@angular/core';
import { ToDo } from '@api';
import { NavigationService } from '@core';
import { AuthService } from '@core/services/auth.service';
import { ToDosByProjectName } from '@core/stateful-services';
import { CurrentUser } from '@core/stateful-services/queries/current-user';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-project-panel',
  templateUrl: './project-panel.component.html',
  styleUrls: ['./project-panel.component.scss']
})
export class ProjectPanelComponent {

  public count$ = this._currentUser
  .query()
  .pipe(
    switchMap(user => this._toDosByProjectName.query(user.currentProjectName)),
    map((toDos: ToDo[]) => {
      return toDos.filter(x => x.status != 'Complete').length;
    })
  );

  constructor(
    private readonly _currentUser: CurrentUser,
    private readonly _toDosByProjectName: ToDosByProjectName,
    private readonly _authService: AuthService,
    private readonly _navigationService: NavigationService
  ) { }

  public logout() {
    this._authService.tryToLogout();
    this._navigationService.redirectToLogin();
  }
}
