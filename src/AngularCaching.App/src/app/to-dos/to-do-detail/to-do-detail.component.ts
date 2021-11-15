import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDo } from '@api';
import { ToDoStore } from '@core/store';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-to-do-detail',
  templateUrl: './to-do-detail.component.html',
  styleUrls: ['./to-do-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoDetailComponent {
  public vm$ = this._activatedRoute
  .paramMap
  .pipe(
    map(paramMap => paramMap.get("toDoId")),
    switchMap(toDoId => {
      return toDoId != null
      ? this._toDoStore.toDoById(toDoId)
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
    private readonly _toDoStore: ToDoStore,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router
  ) { }

  public save(toDo: ToDo) {
    const obs$ = toDo.toDoId != null
    ? this._toDoStore.update({ toDo })
    : this._toDoStore.create({ toDo });

    obs$
    .pipe(
      tap(_ => this._router.navigate(['/']))
    )
    .subscribe();
  }

  public complete(toDo: ToDo) {
    toDo.status = "Complete";
    this._toDoStore.update({ toDo })
    .pipe(
      tap(_ => this._router.navigate(['/']))
    )
    .subscribe();
  }

}
