import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Project, User } from '@api';
import { PromotionStore, UserStore, ProjectStore, ToDoStore, NavigationService, AuthStore } from '@core';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-project-panel',
  templateUrl: './project-panel.component.html',
  styleUrls: ['./project-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectPanelComponent {

  public vm$ = this._userStore.getCurrent()
  .pipe(
    switchMap(user => {
      return this._projectStore.getProjectByName(user.currentProjectName)
      .pipe(
        map(project => {
          return [user, project] as [User, Project]
        })
      )
    }),
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

  public user$ = this._userStore.select(x => x.currentUser.username);

  constructor(
    private readonly _userStore: UserStore,
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
