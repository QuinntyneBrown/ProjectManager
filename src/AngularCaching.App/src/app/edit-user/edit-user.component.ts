import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User, UserService } from '@api';
import { Destroyable, Dispatcher } from '@core';
import { CURRENT_USER_CHANGED } from '@core/store';
import { UserStore } from '@core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent extends Destroyable {

  private _refresh$: BehaviorSubject<void> = new BehaviorSubject(null);

  public vm$ = this._currentUser.currentUser()
  .pipe(
    switchMap(user => this._refresh$.pipe(map(_ => user))),
    map(user => {
      const formControl = new FormControl(user.currentProjectName,[Validators.required]);

      formControl.valueChanges
      .pipe(
        takeUntil(this._destroyed$),
        map(value => value.name),
        switchMap((currentProjectName)=> {
          return this._userService.update({
            user: {
              userId: user.userId,
              currentProjectName
            } as User
          })
        }),
        tap(_ => this._dispatcher.emit(CURRENT_USER_CHANGED))
      ).subscribe();

      return {
        user,
        formControl
      }
    })
  );

  constructor(
    private readonly _currentUser: UserStore,
    private readonly _userService: UserService,
    private readonly _dispatcher: Dispatcher
  ) {
    super();
  }
}
