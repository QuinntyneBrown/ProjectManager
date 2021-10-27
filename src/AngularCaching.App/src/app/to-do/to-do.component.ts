import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDo } from '@api/models';
import { ToDoService } from '@api/services/to-do.service';
import { AppStateService } from '@core/app-state.service';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent {

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
      ? this._appStateService.getEntity$(toDoId)
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
    private readonly _appStateService: AppStateService,
    private readonly _toDoService: ToDoService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router
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
        this._appStateService.refreshEntities();
        this._appStateService.refreshEntity(toDo.toDoId);
        this._router.navigate(['/']);
      })
    )
    .subscribe();
  }
}
