import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BASE_URL, HeadersInterceptor, JwtInterceptor, LOGGER, LogLevel, MINIMUM_LOG_LEVEL } from '@core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@shared/layout/layout.module';
import { ConsoleLogger } from '@core/services/console-logger';
import { environment } from 'src/environments/environment';
import { EntityStoresModule } from '@core/entity-stores/entity-stores.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule,
    EntityStoresModule
  ],
  providers: [
    {
      provide: BASE_URL,
      useValue: "https://localhost:5001/"
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: MINIMUM_LOG_LEVEL,
      useValue: environment.minLogLevel
    },
    {
      provide: LOGGER,
      useClass: ConsoleLogger
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
