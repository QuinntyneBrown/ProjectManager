import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToDo } from '@api/models';
import { ToDoService } from '@api/services/to-do.service';
import { ToDos } from '@core/stateful-services/queries/to-dos';
import { map, tap } from 'rxjs/operators';


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

  public vm$ = this._toDos.query()
  .pipe(
    map(toDos => ({ toDos }))
  )

  constructor(
    private readonly _toDos: ToDos,
    private readonly _toDoService: ToDoService
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
