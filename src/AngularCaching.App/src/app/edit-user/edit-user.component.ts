import { Component, OnInit } from '@angular/core';
import { UserService } from '@api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  public vm$ = this._userService.getCurrent()
  .pipe(
    map(user => ({ user }))
  );

  constructor(
    private readonly _userService: UserService
  ) {

  }
}
