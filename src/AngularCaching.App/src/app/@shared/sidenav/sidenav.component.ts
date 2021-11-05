import { Component, OnInit } from '@angular/core';
import { ToDo } from '@api';
import { CachedQueryService } from '@core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent   {

  public count$ = this._cachedQueryService.getEntities$()
  .pipe(
    map((toDos: ToDo[]) => toDos.length)
  );
  constructor(
    private readonly _cachedQueryService: CachedQueryService
  ) { }

}
