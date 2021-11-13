import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '@core';
import { Destroyable } from '@core/abstractions';
import { AuthService } from '@core/services/auth.service';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Destroyable {
  public form = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    rememberMe: new FormControl(null, [])
  });

  constructor(
    private readonly _authService: AuthService,
    private readonly _navigationService: NavigationService
  ) {
    super();
  }

  public tryToLogin(credentials:any) {
    this._authService.tryToLogin({
      username: credentials.username,
      password: credentials.password
    })
    .pipe(
      takeUntil(this._destroyed$),
      tap(x => {
        this._navigationService.redirectPreLogin();
      }),
    ).subscribe();
  }

}
