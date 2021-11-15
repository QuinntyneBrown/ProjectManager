import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserStore, ToDoStore } from '@core';
import { map, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-to-do-list',
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
  .currentUser()
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
