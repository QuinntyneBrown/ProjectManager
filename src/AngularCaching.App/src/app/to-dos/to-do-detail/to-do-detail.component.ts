import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDo, ToDoService } from '@api';
import { Dispatcher, ToDoById } from '@core/stateful-services';
import { TO_DOS_CHANGED } from '@core/stateful-services/actions';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-to-do-detail',
  templateUrl: './to-do-detail.component.html',
  styleUrls: ['./to-do-detail.component.scss']
})
export class ToDoDetailComponent {

  public form: FormGroup = new FormGroup({
    toDoId: new FormControl(null, []),
    description: new FormControl(null, []),
    status: new FormControl(null, [])
  })

  public vm$ = this._activatedRoute
  .paramMap
  .pipe(
    map(paramMap => paramMap.get("toDoId")),
    switchMap(toDoId => {
      return toDoId != null
      ? this._toDoById.query(toDoId)
      : of({ })
    }),
    map((toDo: ToDo) => {
      const form: FormGroup = new FormGroup({
        toDoId: new FormControl(toDo.toDoId, []),
        description: new FormControl(toDo.description, []),
        status: new FormControl(toDo.status,[])
      });
      return {
        form
      }
    })
  )

  constructor(
    private readonly _toDoById: ToDoById,
    private readonly _toDoService: ToDoService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _dispatcher: Dispatcher
  ) { }

  public save(toDo: ToDo) {
    const obs$ = toDo.toDoId != null
    ? this._toDoService.update({
      toDo
    })
    : this._toDoService.create({
      toDo
    });

    obs$
    .pipe(
      tap(_ => {
        this._dispatcher.emit(TO_DOS_CHANGED);
        this._router.navigate(['/']);
      })
    )
    .subscribe();
  }

  public complete(toDo: ToDo) {
    toDo.status = "Complete";
    this._toDoService.update({ toDo })
    .pipe(
      tap(_ => {
        this._dispatcher.emit(TO_DOS_CHANGED);
        this._router.navigate(['/']);
      })
    )
    .subscribe();
  }
}
