import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { BASE_URL, headersInterceptor, jwtInterceptor, LOGGER, MINIMUM_LOG_LEVEL } from '@core';
import { ConsoleLogger } from '@core/services/console-logger';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([headersInterceptor, jwtInterceptor])
    ),
    {
      provide: BASE_URL,
      useValue: "https://localhost:5001/"
    },
    {
      provide: MINIMUM_LOG_LEVEL,
      useValue: environment.minLogLevel
    },
    {
      provide: LOGGER,
      useClass: ConsoleLogger
    }
  ]
}).catch(err => console.error(err));
