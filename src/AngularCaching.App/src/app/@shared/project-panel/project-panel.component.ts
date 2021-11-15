import { Component } from '@angular/core';
import { PromotionStore, UserStore, ProjectStore, ToDoStore, NavigationService, AuthStore } from '@core';
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
    this._projectStore.currentUserProject$()
  ])
  .pipe(
    switchMap(([user, project]) => {
      return combineLatest([
        this._toDoStore.toDoByProjectName(user.currentProjectName),
        this._promotionStore.getPromotionsByProjectId(project.projectId)
      ])
      .pipe(
        map(([toDos, promotions]) => ({ toDos, user, project, promotions }))
      )
    })
  );

  constructor(
    private readonly _currentUser: UserStore,
    private readonly _toDoStore: ToDoStore,
    private readonly _projectStore: ProjectStore,
    private readonly _authStore: AuthStore,
    private readonly _navigationService: NavigationService,
    private readonly _promotionStore: PromotionStore,
  ) { }

  public logout() {
    this._authStore.tryToLogout();
    this._navigationService.redirectToLogin();
  }
}
