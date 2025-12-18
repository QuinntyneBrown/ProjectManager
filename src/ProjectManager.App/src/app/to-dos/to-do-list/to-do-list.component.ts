import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserStore, ToDoStore } from '@core';
import { map, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListComponent  {

  public form: FormGroup = new FormGroup({
    toDoId: new FormControl(null, []),
    description: new FormControl(null, [])
  })

  public vm$ = this._userStore
  .getCurrent()
  .pipe(
    switchMap(user => this._toDoStore.toDoByProjectName(user.currentProjectName)),
    map(toDos => {

      return { toDos };
    })
  )

  constructor(
    private readonly _toDoStore: ToDoStore,
    private readonly _userStore: UserStore
  ) { }
}
