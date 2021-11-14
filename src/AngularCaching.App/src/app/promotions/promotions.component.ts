import { Component } from '@angular/core';
import { PromotionStore, ProjectStore } from '@core';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent {

  public vm$ = this._currentUserProject
  .currentUserProject()
  .pipe(
    switchMap(project => this._promotionsByProjectId.getPromotionsByProjectId(project.projectId)),
    map(promotions => ({ promotions }))
  );

  constructor(
    private readonly _currentUserProject: ProjectStore,
    private readonly _promotionsByProjectId: PromotionStore
  ) {

  }
}
