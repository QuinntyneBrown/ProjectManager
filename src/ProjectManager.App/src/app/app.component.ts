import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectStore, UserStore } from '@core';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
