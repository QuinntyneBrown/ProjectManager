import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '@core';
import { Destroyable } from '@core/abstractions';
import { AuthStore } from '@core/store/entity-stores/auth.store';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends Destroyable {
  public form = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  constructor(
    private readonly _authStore: AuthStore,
    private readonly _navigationService: NavigationService,
  ) {
    super();
  }

  public tryToLogin(credentials:any) {
    this._authStore.tryToLogin({
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
