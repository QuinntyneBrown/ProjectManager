import { Injectable } from "@angular/core";
import { PromotionService, ToDo } from "@api";
import { Observable } from "rxjs";
import { Store } from "@core/store";
import { CURRENT_USER_PROJECT_CHANGED } from "../actions";

@Injectable({
  providedIn: "root"
})
export class PromotionStore {
  constructor(
    private readonly _store: Store,
    private readonly _promotionService: PromotionService
  ) { }

  public getPromotionsByProjectId(projectId: string): Observable<ToDo[]> { return this._store.fromStoreOrServiceWithRefresh$(`PROMOTIONS_BY_PROJECT_ID_${projectId}`, () => this._promotionService.getByProjectId({ projectId }), CURRENT_USER_PROJECT_CHANGED); }
}
