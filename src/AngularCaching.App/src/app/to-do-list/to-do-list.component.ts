import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToDo } from '@api/models';
import { ToDoService } from '@api/services/to-do.service';
import { AppStateService } from '@core/app-state.service';
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

  public vm$ = this._appStateService.getEntities$()
  .pipe(
    map(toDos => ({ toDos }))
  )

  constructor(
    private readonly _appStateService: AppStateService,
    private readonly _toDoService: ToDoService
  ) { }

  public save(toDo: ToDo) {
    this._toDoService.create({
      toDo
    })
    .pipe(
      tap(_ => {
        this.form.reset();
        this._appStateService.refreshEntities();
      })
    )
    .subscribe();
  }

}
