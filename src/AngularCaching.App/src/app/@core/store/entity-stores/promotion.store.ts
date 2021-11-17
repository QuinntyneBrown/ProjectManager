import { Inject, Injectable } from "@angular/core";
import { PromotionService, ToDo } from "@api";
import { Observable } from "rxjs";
import { BASE_URL, storeMixin } from "@core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PromotionStore extends storeMixin(PromotionService) {
  constructor(
    @Inject(BASE_URL) _baseUrl:string,
    _httpClient: HttpClient
  ) {
    super(_baseUrl, _httpClient)
  }


  public getPromotionsByProjectId(projectId: string): Observable<ToDo[]> { return super.from$(() => super.getByProjectId({ projectId }), [`PROMOTIONS_BY_PROJECT_ID_${projectId}`, "CURRENT_USER_PROJECT", "TO_DOS"]); }
}
