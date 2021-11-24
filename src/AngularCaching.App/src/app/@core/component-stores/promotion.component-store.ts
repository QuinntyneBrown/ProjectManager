import { Promotion } from "@api";
import { IPromotionStore } from "@core/abstractions/stores";
import { ComponentStore } from "@ngrx/component-store";
import { BehaviorSubject, Observable } from "rxjs";
import { first, shareReplay, switchMap, tap } from "rxjs/operators";

interface IPromotionStoreState {
  projectId?: string;
}

export class PromotionStore extends ComponentStore<IPromotionStoreState> implements IPromotionStore {

  private readonly _refreshSubject: BehaviorSubject<void> = new BehaviorSubject(null);

  private readonly _promotionsByProjectId$ = this.select(x => x.projectId)
  .pipe(
    switchMap(projectId => this._promotionStore.getPromotionsByProjectId({ projectId })),
    shareReplay(1)
  );

  constructor(
    private readonly _promotionStore: PromotionStore
  ) {
    super({ });
  }

  getPromotionsByProjectId(options: { projectId: string }): Observable<Promotion[]> {
    return this._refreshSubject
    .pipe(
      switchMap(_ => this.select(x => x.projectId)),
      first(),
      tap(projectId => {
        if(projectId != options.projectId) {
          this.setProjectId(options.projectId);
        }
      }),
      switchMap(_ => this._promotionsByProjectId$)
    )
  }

  private readonly setProjectId =
  this.updater<Readonly<string>>(
      (state, projectId) => ({...state, projectId}));

  selectByCacheKey<T>(cacheKey: string): Observable<T> {
    throw new Error("Method not implemented.");
  }
}
