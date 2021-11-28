import { Injectable } from "@angular/core";
import { AuthService } from "@core/services/auth.service";


@Injectable({
  providedIn:"root"
})
export class AuthStore {
  constructor(
    private readonly _authService: AuthService
  ) { }

  public tryToLogout() {
    this._authService.tryToLogout();
  }

  public tryToLogin(options: { username: string, password: string }) {
    return this._authService.tryToLogin(options);
  }
}
