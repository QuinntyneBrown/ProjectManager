import { Component } from '@angular/core';
import { NavigationService, Dispatcher } from '@core';
import { AuthService } from '@core/services/auth.service';
import { ToDoStore, CURRENT_USER_CHANGED } from '@core/store';
import { PromotionStore, UserStore, ProjectStore } from '@core';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-project-panel',
  templateUrl: './project-panel.component.html',
  styleUrls: ['./project-panel.component.scss']
})
export class ProjectPanelComponent {

  public vm$ = combineLatest([
    this._currentUser.currentUser(),
    this._currentUserProject.currentUserProject()
  ])
  .pipe(
    switchMap(([user, project]) => {
      return combineLatest([
        this._toDoStore.toDoByProjectName(user.currentProjectName),
        this._promotionsByProjectId.getPromotionsByProjectId(project.projectId)
      ])
      .pipe(
        map(([toDos, promotions]) => ({ toDos, user, project, promotions }))
      )
    })
  );

  constructor(
    private readonly _currentUser: UserStore,
    private readonly _toDoStore: ToDoStore,
    private readonly _currentUserProject: ProjectStore,
    private readonly _authService: AuthService,
    private readonly _navigationService: NavigationService,
    private readonly _promotionsByProjectId: PromotionStore,
    private readonly _dispatcher: Dispatcher
  ) { }

  public logout() {
    this._authService.tryToLogout();
    this._navigationService.redirectToLogin();
    this._dispatcher.emit(CURRENT_USER_CHANGED);
  }
}
