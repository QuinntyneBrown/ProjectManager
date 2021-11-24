import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDo } from '@api';
import { ToDoStore, UserStore } from '@core';
import { IToDoStore, IUserStore, TO_DO_STORE, USER_STORE } from '@core/abstractions/stores';
import { combineLatest, of } from 'rxjs';
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
    switchMap(toDoId => combineLatest([
      toDoId != null ? this._toDoStore.getToDoById({ toDoId: toDoId }) : of({ } as ToDo),
      this._userStore.getCurrent()
    ])),
    map(([toDo, user]) => {
      const form: FormGroup = new FormGroup({
        toDoId: new FormControl(toDo.toDoId, []),
        projectName: new FormControl(toDo.projectName || user.currentProjectName,[Validators.required]),
        description: new FormControl(toDo.description, []),
        status: new FormControl(toDo.status,[])
      });
      return { form }
    })
  )

  constructor(
    @Inject(TO_DO_STORE) private readonly _toDoStore: IToDoStore,
    @Inject(USER_STORE) private readonly _userStore: IUserStore,
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
    .pipe(tap(_ => this._router.navigate(['/'])))
    .subscribe();
  }
}
