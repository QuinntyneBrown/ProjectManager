import { Component } from '@angular/core';
import { CurrentUserProject } from '@core/stateful-services/queries/current-user-project';
import { PromotionsByProjectId } from '@core/stateful-services/queries/promotions-by-project-id';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent {

  public vm$ = this._currentUserProject
  .query()
  .pipe(
    switchMap(project => this._promotionsByProjectId.query(project.projectId)),
    map(promotions => ({ promotions }))
  );

  constructor(
    private readonly _currentUserProject: CurrentUserProject,
    private readonly _promotionsByProjectId: PromotionsByProjectId
  ) {

  }
}
