import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Promotion } from '@api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL, EntityPage, IPagableService } from '@core';

@Injectable({
  providedIn: 'root'
})
export class PromotionService implements IPagableService<Promotion> {

  uniqueIdentifierName: string = "promotionId";

  constructor(
    @Inject(BASE_URL) private readonly _baseUrl: string,
    private readonly _client: HttpClient
  ) { }

  getPage(options: { pageIndex: number; pageSize: number; }): Observable<EntityPage<Promotion>> {
    return this._client.get<EntityPage<Promotion>>(`${this._baseUrl}api/promotion/page/${options.pageSize}/${options.pageIndex}`)
  }

  public get(): Observable<Promotion[]> {
    return this._client.get<{ promotions: Promotion[] }>(`${this._baseUrl}api/promotion`)
      .pipe(
        map(x => x.promotions)
      );
  }

  public getById(options: { promotionId: string }): Observable<Promotion> {
    return this._client.get<{ promotion: Promotion }>(`${this._baseUrl}api/promotion/${options.promotionId}`)
      .pipe(
        map(x => x.promotion)
      );
  }

  public remove(options: { promotion: Promotion }): Observable<void> {
    return this._client.delete<void>(`${this._baseUrl}api/promotion/${options.promotion.promotionId}`);
  }

  public create(options: { promotion: Promotion }): Observable<{ promotion: Promotion }> {
    return this._client.post<{ promotion: Promotion }>(`${this._baseUrl}api/promotion`, { promotion: options.promotion });
  }

  public update(options: { promotion: Promotion }): Observable<{ promotion: Promotion }> {
    return this._client.put<{ promotion: Promotion }>(`${this._baseUrl}api/promotion`, { promotion: options.promotion });
  }
}
