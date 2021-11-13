import { Injectable, Inject } from "@angular/core";
import { MINIMUM_LOG_LEVEL } from "@core/constants";
import { LogLevel } from "./log-level";

@Injectable({
  providedIn: "root"
})
export class Logger {
  constructor(@Inject(MINIMUM_LOG_LEVEL) private _minimumLogLevel: LogLevel) {}

  public log(logLevel: LogLevel, message: any) {
    if (typeof message != "string") message = JSON.stringify(message);

    if (logLevel >= this._minimumLogLevel) console.log(`${LogLevel[logLevel]}: ${message}`);
  }

  public trace(message: any) {
    this.log(LogLevel.Trace, message);
  }

  public error(message: any) {
    this.log(LogLevel.Error, message);
  }
}
