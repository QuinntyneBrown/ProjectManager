import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToDo } from '@api/models';
import { ToDoService } from '@api/services/to-do.service';
import { CurrentUser } from '@core/stateful-services/queries/current-user';
import { ToDosByProjectName } from '@core/stateful-services/queries/to-dos-by-project-name';
import { map, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent  {

  public form: FormGroup = new FormGroup({
    toDoId: new FormControl(null, []),
    description: new FormControl(null, [])
  })

  public vm$ = this._currentUser
  .query()
  .pipe(
    switchMap(user => this._toDos.query(user.currentProjectName)),
    map(toDos => ({ toDos }))
  )

  constructor(
    private readonly _toDos: ToDosByProjectName,
    private readonly _toDoService: ToDoService,
    private readonly _currentUser: CurrentUser
  ) { }

  public save(toDo: ToDo) {
    this._toDoService.create({
      toDo
    })
    .pipe(
      tap(_ => {
        this.form.reset();
      })
    )
    .subscribe();
  }
}
