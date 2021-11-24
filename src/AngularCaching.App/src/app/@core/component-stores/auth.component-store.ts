import { Injectable } from "@angular/core";
import { IAuthStore } from "@core/abstractions/stores";
import { AuthService } from "@core/services/auth.service";
import { ComponentStore } from "@ngrx/component-store";
import { BehaviorSubject, Observable } from "rxjs";

interface AuthStoreState {

}

@Injectable()
export class AuthStore extends ComponentStore<AuthStoreState> implements IAuthStore {

  private readonly _refreshSubject: BehaviorSubject<void> = new BehaviorSubject(null);

  constructor(
    private readonly _authService: AuthService
  ) {
    super();
  }

  tryToLogout(): void {
    this._authService.tryToLogout();
  }

  tryToLogin(options: { username: string; password: string; }): Observable<any> {
    return this.tryToLogin(options);
  }

  selectByCacheKey<T>(cacheKey: string): Observable<T> {
    throw new Error("Method not implemented.");
  }
}
