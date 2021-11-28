import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectStore, UserStore } from '@core';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(
    _projectStore: ProjectStore,
    _userStore: UserStore,
  ) {
    combineLatest([
      _userStore.getCurrent()
    ])
    .pipe(
      tap(x => {
        // push data to analytics platform
        console.log(x);
      })
    ).subscribe();
  }
}
