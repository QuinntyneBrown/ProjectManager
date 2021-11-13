import { Component } from '@angular/core';
import { ToDo } from '@api';
import { NavigationService } from '@core';
import { AuthService } from '@core/services/auth.service';
import { ToDos } from '@core/stateful-services';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project-panel',
  templateUrl: './project-panel.component.html',
  styleUrls: ['./project-panel.component.scss']
})
export class ProjectPanelComponent {

  public count$ = this._toDos.query()
  .pipe(
    map((toDos: ToDo[]) => {
      return toDos.filter(x => x.status != 'Complete').length;
    })
  );

  constructor(
    private readonly _toDos: ToDos,
    private readonly _authService: AuthService,
    private readonly _navigationService: NavigationService
  ) { }

  public logout() {
    this._authService.tryToLogout();
    this._navigationService.redirectToLogin();
  }
}
