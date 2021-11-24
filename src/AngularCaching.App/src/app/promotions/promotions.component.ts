import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PromotionStore, ProjectStore } from '@core';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionsComponent {

  public vm$ = this._projectStore
  .getCurrentUserProject()
  .pipe(
    switchMap(project => this._promotionStore.getPromotionsByProjectId({ projectId: project.projectId})),
    map(promotions => ({ promotions }))
  );

  constructor(
    private readonly _projectStore: ProjectStore,
    private readonly _promotionStore: PromotionStore
  ) {

  }
}
