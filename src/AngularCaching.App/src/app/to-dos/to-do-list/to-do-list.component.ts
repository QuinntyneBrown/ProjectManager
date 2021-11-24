import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IToDoStore, IUserStore, TO_DO_STORE, USER_STORE } from '@core/abstractions/stores';
import { map, switchMap } from 'rxjs/operators';


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
  .getCurrent()
  .pipe(
    switchMap(user => this._toDoStore.getToDosByProjectName({ projectName: user.currentProjectName})),
    map(toDos => ({ toDos }))
  )

  constructor(
    @Inject(TO_DO_STORE) private readonly _toDoStore: IToDoStore,
    @Inject(USER_STORE) private readonly _userStore: IUserStore
  ) { }
}
