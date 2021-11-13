import { Component } from '@angular/core';
import { UserService } from '@api';
import { CurrentUser } from '@core/stateful-services/queries/current-user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  public vm$ = this._currentUser.query()
  .pipe(
    map(user => ({ user }))
  );

  constructor(
    private readonly _currentUser: CurrentUser,
    private readonly _userService: UserService
  ) {

  }
}
