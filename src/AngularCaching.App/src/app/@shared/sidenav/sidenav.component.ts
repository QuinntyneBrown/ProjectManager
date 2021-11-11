import { Component } from '@angular/core';
import { ToDo } from '@api';
import { ToDos } from '@core/stateful-services/to-dos';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent   {

  public count$ = this._toDos.query()
  .pipe(
    map((toDos: ToDo[]) => {
      return toDos.filter(x => x.status != 'Complete').length;
    })
  );

  constructor(
    private readonly _toDos: ToDos
  ) { }

}
