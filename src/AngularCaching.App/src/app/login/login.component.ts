import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthStore, Destroyable, ILogger, NavigationService, LOGGER, LogLevel } from '@core';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends Destroyable implements OnInit  {
  private _initDate: Date;

  public form = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  constructor(
    private readonly _authStore: AuthStore,
    private readonly _navigationService: NavigationService,
    @Inject(LOGGER) private readonly _logger: ILogger
  ) {
    super();
  }

  ngOnInit() {
    this._initDate = new Date();
  }

  public tryToLogin(credentials:any) {
    const timeToLogin = (new Date().getTime() - this._initDate.getTime());

    this._logger.log(LogLevel.Trace, `Time to login: ${timeToLogin / 1000} seconds`);

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
