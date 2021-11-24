import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NavigationService, Destroyable } from '@core';
import { AUTH_STORE, IAuthStore, IProjectStore, IPromotionStore, IToDoStore, IUserStore, PROJECT_STORE, PROMOTION_STORE, TO_DO_STORE, USER_STORE } from '@core/abstractions/stores';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-project-panel',
  templateUrl: './project-panel.component.html',
  styleUrls: ['./project-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectPanelComponent extends Destroyable {

  public vm$ = combineLatest([
    this._userStore.getCurrent(),
    this._projectStore.getCurrentUserProject()
  ])
  .pipe(
    switchMap(([user, project]) => {
      return combineLatest([
        this._toDoStore.getToDosByProjectName({ projectName: user.currentProjectName}),
        this._promotionStore.getPromotionsByProjectId(project.projectId)
      ])
      .pipe(
        map(([toDos, promotions]) => ({ toDos, user, project, promotions }))
      )
    })
  );

  constructor(
    @Inject(USER_STORE) private readonly _userStore: IUserStore,
    @Inject(TO_DO_STORE) private readonly _toDoStore: IToDoStore,
    @Inject(PROJECT_STORE) private readonly _projectStore: IProjectStore,
    @Inject(AUTH_STORE) private readonly _authStore: IAuthStore,
    private readonly _navigationService: NavigationService,
    @Inject(PROMOTION_STORE) private readonly _promotionStore: IPromotionStore
  ) {
    super();

  }

  public logout() {
    this._authStore.tryToLogout();
    this._navigationService.redirectToLogin();
  }
}
