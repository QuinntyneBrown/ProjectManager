import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDo } from '@api';
import { ToDoStore, UserStore } from '@core';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-to-do-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './to-do-detail.component.html',
  styleUrls: ['./to-do-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoDetailComponent {

  private readonly _refresh$: BehaviorSubject<void> = new BehaviorSubject(null);

  public vm$ = this._activatedRoute
  .paramMap
  .pipe(
    map(paramMap => paramMap.get("toDoId")),
    switchMap(toDoId => this._refresh$.pipe(map(_ => toDoId))),
    switchMap(toDoId => combineLatest([
      toDoId != null ? this._toDoStore.toDoById(toDoId) : of({ } as ToDo),
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
    private readonly _toDoStore: ToDoStore,
    private readonly _userStore: UserStore,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router
  ) { }

  public save(toDo: ToDo) {
    const obs$ = toDo.toDoId != null
    ? this._toDoStore.update( toDo )
    : this._toDoStore.create( toDo );
    this._refresh$.next();
    this._router.navigate(['/']);
  }

  public complete(toDo: ToDo) {
    toDo.status = "Complete";
    this._toDoStore.update(toDo);
    this._router.navigate(['/']);
  }
}
