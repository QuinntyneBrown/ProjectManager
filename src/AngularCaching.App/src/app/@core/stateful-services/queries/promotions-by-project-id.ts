import { Injectable } from "@angular/core";
import { PromotionService, ToDo } from "@api";
import { Observable } from "rxjs";
import { Cache } from "@core/stateful-services/cache";
import { CURRENT_USER_PROJECT_CHANGED } from "../actions";

@Injectable({
  providedIn: "root"
})
export class PromotionsByProjectId {
  constructor(
    private readonly _cache: Cache,
    private readonly _promotionService: PromotionService
  ) { }

  public query(projectId: string): Observable<ToDo[]> { return this._cache.fromCacheOrServiceWithRefresh$(`PROMOTIONS_BY_PROJECT_ID_${projectId}`, () => this._promotionService.getByProjectId({ projectId }), CURRENT_USER_PROJECT_CHANGED); }
}
