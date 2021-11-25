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
    setTimeout(() => {
      this._toDoStore.getToDoById("2c369f0c-9de9-411f-a3d2-91fcbdfeb3c1");
      this._toDoStore.getToDos();
    }, 3000);
  }

  public vm$ = this._toDoStore.getToDos()
  .pipe(
    map(toDos => ({ toDos }))
  )

  public s = this._toDoStore.getToDos();

  public d$ = this._toDoStore.getToDoById("9eaef948-83c9-4766-946e-57559d450186");

  public vm$1 = this._toDoStore.getToDos()
  .pipe(
    map(toDos => ({ toDos }))
  )
}
