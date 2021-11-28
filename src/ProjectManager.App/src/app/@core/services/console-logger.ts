import { Injectable, Inject } from "@angular/core";
import { LogLevel } from "@core/abstractions/logger";
import { MINIMUM_LOG_LEVEL } from "@core/constants";


@Injectable()
export class ConsoleLogger {
  constructor(@Inject(MINIMUM_LOG_LEVEL) private _minLevel: LogLevel) {}


  public log(logLevel: LogLevel, message: any) {
    if (typeof message != "string") message = JSON.stringify(message);

    if (logLevel >= this._minLevel) {
      const msg = `[${new Date().toISOString()}] ${LogLevel[logLevel]}: ${message}`;

      switch (logLevel) {
        case LogLevel.Error:
          console.error(msg);
            break;
        case LogLevel.Warning:
          console.warn(msg);
            break;
        default:
          console.log(msg);
            break;
          }
        }
      }

  public trace(message: any) {
    this.log(LogLevel.Trace, message);
  }

  public error(message: any) {
    this.log(LogLevel.Error, message);
  }

  public warn(message: any) {
    this.log(LogLevel.Warning, message);
  }
}
