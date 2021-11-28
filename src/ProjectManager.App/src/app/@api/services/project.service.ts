import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '@api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL, EntityPage, IPagableService } from '@core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements IPagableService<Project> {

  uniqueIdentifierName: string = "projectId";

  constructor(
    @Inject(BASE_URL) private readonly _baseUrl: string,
    private readonly _client: HttpClient
  ) { }

  public getCurrentUserProject(): Observable<Project> {
    return this._client.get<{ project: Project }>(`${this._baseUrl}api/project/user/current`)
      .pipe(
        map(x => x.project)
      );
  }

  getPage(options: { pageIndex: number; pageSize: number; }): Observable<EntityPage<Project>> {
    return this._client.get<EntityPage<Project>>(`${this._baseUrl}api/project/page/${options.pageSize}/${options.pageIndex}`)
  }

  public get(): Observable<Project[]> {
    return this._client.get<{ projects: Project[] }>(`${this._baseUrl}api/project`)
      .pipe(
        map(x => x.projects)
      );
  }

  public getById(options: { projectId: string }): Observable<Project> {
    return this._client.get<{ project: Project }>(`${this._baseUrl}api/project/${options.projectId}`)
      .pipe(
        map(x => x.project)
      );
  }

  public getByName(options: { name: string }): Observable<Project> {
    return this._client.get<{ project: Project }>(`${this._baseUrl}api/project/name/${options.name}`)
      .pipe(
        map(x => x.project)
      );
  }

  public remove(options: { project: Project }): Observable<void> {
    return this._client.delete<void>(`${this._baseUrl}api/project/${options.project.projectId}`);
  }

  public create(options: { project: Project }): Observable<{ project: Project }> {
    return this._client.post<{ project: Project }>(`${this._baseUrl}api/project`, { project: options.project });
  }

  public update(options: { project: Project }): Observable<{ project: Project }> {
    return this._client.put<{ project: Project }>(`${this._baseUrl}api/project`, { project: options.project });
  }
}
