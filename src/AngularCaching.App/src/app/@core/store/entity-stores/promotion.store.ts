import { Inject, Injectable } from "@angular/core";
import { PromotionService, ToDo } from "@api";
import { Observable } from "rxjs";
import { Dispatcher, Store } from "@core/store";
import { CURRENT_USER_PROJECT_CHANGED } from "../actions";
import { BASE_URL, TO_DOS_CHANGED } from "@core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PromotionStore extends PromotionService {
  constructor(
    @Inject(BASE_URL) _baseUrl:string,
    _httpClient: HttpClient,
    private readonly _store: Store,
    private readonly _dispatcher: Dispatcher
  ) {
    super(_baseUrl, _httpClient)
  }


  public getPromotionsByProjectId(projectId: string): Observable<ToDo[]> { return this._store.fromStoreOrServiceWithRefresh$(`PROMOTIONS_BY_PROJECT_ID_${projectId}`, () => this.getByProjectId({ projectId }), [CURRENT_USER_PROJECT_CHANGED, TO_DOS_CHANGED]); }
}
