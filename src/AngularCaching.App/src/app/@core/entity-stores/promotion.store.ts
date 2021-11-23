import { Inject, Injectable } from "@angular/core";
import { Promotion, PromotionService, ToDo } from "@api";
import { Observable } from "rxjs";
import { BASE_URL } from "@core/constants";
import { HttpClient } from "@angular/common/http";
import { queryStore } from "@quinntyne/query-store";

@Injectable({
  providedIn: "root"
})
export class PromotionStore extends queryStore(PromotionService) {
  constructor(
    @Inject(BASE_URL) _baseUrl:string,
    _httpClient: HttpClient
  ) {
    super(_baseUrl, _httpClient)
  }

  public getPromotionsByProjectId(projectId: string): Observable<Promotion[]> { return super.from$(() => super.getByProjectId({ projectId }), [`PROMOTIONS_BY_PROJECT_ID_${projectId}`, "CURRENT_USER_PROJECT", "TO_DOS"]); }
}
