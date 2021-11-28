import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PromotionStore, ProjectStore, UserStore } from '@core';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionsComponent {

  public vm$ = this._userStore
  .select(x => x.currentUser)
  .pipe(
    switchMap(currentUser => this._projectStore.getProjectByName(currentUser.currentProjectName)),
    switchMap(project => this._promotionStore.getPromotionsByProjectId(project.projectId)),
    map(promotions => ({ promotions }))
  );

  constructor(
    private readonly _userStore: UserStore,
    private readonly _projectStore: ProjectStore,
    private readonly _promotionStore: PromotionStore
  ) {

  }
}
