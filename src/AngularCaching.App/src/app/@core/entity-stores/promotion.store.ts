import { Inject, Injectable } from "@angular/core";
import { Promotion, PromotionService, ToDo } from "@api";
import { Observable } from "rxjs";
import { BASE_URL } from "@core/constants";
import { HttpClient } from "@angular/common/http";
import { queryStore } from "@quinntyne/query-store";
import { IPromotionStore } from "@core/abstractions/stores";

@Injectable()
export class PromotionStore extends queryStore(PromotionService) implements IPromotionStore {
  constructor(
    @Inject(BASE_URL) _baseUrl:string,
    _httpClient: HttpClient
  ) {
    super(_baseUrl, _httpClient)
  }

  public selectByCacheKey<T>(cacheKey: string): Observable<T> {
    return this.select(cacheKey);
  }

  public getPromotionsByProjectId(options: { projectId: string }): Observable<Promotion[]> { return super.from$(() => super.getByProjectId({ projectId: options.projectId }), [`PROMOTIONS_BY_PROJECT_ID_${options.projectId}`, "CURRENT_USER_PROJECT", "TO_DOS"]); }
}
