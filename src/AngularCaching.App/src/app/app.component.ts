import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnalyticsService } from '@core/third-party/analytics.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(
    _analyticsService: AnalyticsService
  ) {

  }
}
