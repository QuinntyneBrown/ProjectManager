import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '@api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL, EntityPage, IPagableService } from '@core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements IPagableService<Dashboard> {

  uniqueIdentifierName: string = "dashboardId";

  constructor(
    @Inject(BASE_URL) private readonly _baseUrl: string,
    private readonly _client: HttpClient
  ) { }

  getPage(options: { pageIndex: number; pageSize: number; }): Observable<EntityPage<Dashboard>> {
    return this._client.get<EntityPage<Dashboard>>(`${this._baseUrl}api/dashboard/page/${options.pageSize}/${options.pageIndex}`)
  }

  public get(): Observable<Dashboard[]> {
    return this._client.get<{ dashboards: Dashboard[] }>(`${this._baseUrl}api/dashboard`)
      .pipe(
        map(x => x.dashboards)
      );
  }

  public getById(options: { dashboardId: string }): Observable<Dashboard> {
    return this._client.get<{ dashboard: Dashboard }>(`${this._baseUrl}api/dashboard/${options.dashboardId}`)
      .pipe(
        map(x => x.dashboard)
      );
  }

  public remove(options: { dashboard: Dashboard }): Observable<void> {
    return this._client.delete<void>(`${this._baseUrl}api/dashboard/${options.dashboard.dashboardId}`);
  }

  public create(options: { dashboard: Dashboard }): Observable<{ dashboard: Dashboard }> {
    return this._client.post<{ dashboard: Dashboard }>(`${this._baseUrl}api/dashboard`, { dashboard: options.dashboard });
  }

  public update(options: { dashboard: Dashboard }): Observable<{ dashboard: Dashboard }> {
    return this._client.put<{ dashboard: Dashboard }>(`${this._baseUrl}api/dashboard`, { dashboard: options.dashboard });
  }
}
