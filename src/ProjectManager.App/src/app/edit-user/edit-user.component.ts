import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '@api';
import { Destroyable } from '@core';
import { UserStore } from '@core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserComponent extends Destroyable {

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
        tap((currentProjectName)=> {

          this._userStore.update({
            userId: user.userId,
            currentProjectName
          } as User);

        })
      ).subscribe();

      return {
        user,
        formControl
      }
    })
  );

  constructor(
    private readonly _userStore: UserStore
  ) {
    super();
  }
}
