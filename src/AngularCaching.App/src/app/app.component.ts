import { Component } from '@angular/core';
import { ToDo } from '@api';
import { AppStateService } from '@core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public count$ = this._appStateService.getEntities$()
  .pipe(
    map((toDos: ToDo[]) => toDos.length)
  );
  constructor(
    private readonly _appStateService: AppStateService
  ) { }
}
