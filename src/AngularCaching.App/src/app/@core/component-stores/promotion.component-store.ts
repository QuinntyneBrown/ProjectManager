import { Promotion } from "@api";
import { IPromotionStore } from "@core/abstractions/stores";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";

interface IPromotionStoreState {

}

export class PromotionStore extends ComponentStore<IPromotionStoreState> implements IPromotionStore {
  getPromotionsByProjectId(projectId: string): Observable<Promotion[]> {
    throw new Error("Method not implemented.");
  }

}
