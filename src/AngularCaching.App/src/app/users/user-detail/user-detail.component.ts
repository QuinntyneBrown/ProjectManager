import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '@api';
import { Destroyable } from '@core';
import { IUserStore, USER_STORE } from '@core/abstractions/stores';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent extends Destroyable {

  private _refresh$: BehaviorSubject<void> = new BehaviorSubject(null);

  public vm$ = this._userStore.getCurrent()
  .pipe(
    switchMap(user => this._refresh$.pipe(map(_ => user))),
    map(user => {
      const formControl = new FormControl(user.currentProjectName,[Validators.required]);

      formControl.valueChanges
      .pipe(
        takeUntil(this._destroyed$),
        map(value => value.name),
        switchMap((currentProjectName)=> {
          return this._userStore.update({
            user: {
              userId: user.userId,
              currentProjectName
            } as User
          })
        })
      ).subscribe();

      return {
        user,
        formControl
      }
    })
  );

  constructor(
    @Inject(USER_STORE) private readonly _userStore: IUserStore
  ) {
    super();
  }
}
