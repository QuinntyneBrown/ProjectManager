import { Component } from '@angular/core';
import { ToDo } from '@api';
import { CachedQueryService } from '@core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public count$ = this._cachedQueryService.getEntities$()
  .pipe(
    map((toDos: ToDo[]) => toDos.length)
  );
  constructor(
    private readonly _cachedQueryService: CachedQueryService
  ) { }
}
