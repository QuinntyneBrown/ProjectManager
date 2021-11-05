import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDo } from '@api/models';
import { ToDoService } from '@api/services/to-do.service';
import { CachedQueryService } from '@core/cached-query.service';
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
      ? this._cachedQueryService.getEntity$(toDoId)
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
    private readonly _cachedQueryService: CachedQueryService,
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
        this._cachedQueryService.refreshEntities();
        this._router.navigate(['/']);
      })
    )
    .subscribe();
  }
}