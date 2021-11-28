import { Injectable } from "@angular/core";
import { Promotion, PromotionService } from "@api";
import { switchMapByKey } from "@core/abstractions/switch-map-by-key";
import { ComponentStore } from "@ngrx/component-store";
import { of } from "rxjs";
import { first, shareReplay, switchMap, tap } from "rxjs/operators";

export interface PromotionStoreState {
  promotionsByProjectId: Promotion[],
}

@Injectable({
  providedIn: "root"
})
export class PromotionStore extends ComponentStore<PromotionStoreState> {

  constructor(
    private readonly _promotionService: PromotionService
  ) {
    super({ promotionsByProjectId: [] })
  }

  public getPromotionsByProjectId(projectId: string) {
    return of(undefined)
    .pipe(
      tap(_ => this._getPromotionsByProjectId(projectId)),
      switchMap(_ => this.select(x => x.promotionsByProjectId))
    );
  }

  private _getPromotionsByProjectId = this.effect<string>(promotionId$ =>
    promotionId$.pipe(
      switchMapByKey(projectId => projectId, projectId => {
        return this.select(x => x.promotionsByProjectId).pipe(first())
        .pipe(
          switchMap(promotionsByProjectId => {
            return this._promotionService.getByProjectId({ projectId })
            .pipe(
              tap((promotionsByProjectId:Promotion[]) => this.setState((state) => ({ ...state, promotionsByProjectId })))
            )
          }),
        );
      }),
      shareReplay(1)
    ));
}
