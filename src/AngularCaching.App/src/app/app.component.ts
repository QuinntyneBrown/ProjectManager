import { Component } from '@angular/core';
import { ToDoService } from '@api/services';
import { map } from 'rxjs/operators';
import { ToDoStore } from './to-do.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(
    private readonly _toDoStore: ToDoStore
  ) {

  }

  public vm$ = this._toDoStore.getToDos()
  .pipe(
    map(toDos => ({ toDos }))
  )
}
