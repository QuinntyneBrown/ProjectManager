import { Component } from '@angular/core';
import { ToDo } from '@api';
import { NavigationService } from '@core';
import { AuthService } from '@core/services/auth.service';
import { ToDosByProjectName } from '@core/stateful-services';
import { CurrentUser } from '@core/stateful-services/queries/current-user';
import { CurrentUserProject } from '@core/stateful-services/queries/current-user-project';
import { PromotionsByProjectId } from '@core/stateful-services/queries/promotions-by-project-id';
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
      return combineLatest([
        this._toDosByProjectName.query(user.currentProjectName),
        this._promotionsByProjectId.query(project.projectId)
      ])
      .pipe(
        map(([toDos, promotions]) => ({ toDos, user, project, promotions }))
      )
    })
  );

  constructor(
    private readonly _currentUser: CurrentUser,
    private readonly _toDosByProjectName: ToDosByProjectName,
    private readonly _currentUserProject: CurrentUserProject,
    private readonly _authService: AuthService,
    private readonly _navigationService: NavigationService,
    private readonly _promotionsByProjectId: PromotionsByProjectId
  ) { }

  public logout() {
    this._authService.tryToLogout();
    this._navigationService.redirectToLogin();
  }
}
