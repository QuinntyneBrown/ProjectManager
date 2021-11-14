import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Action } from './actions';

@Injectable({
  providedIn: "root"
})
export class Dispatcher {
  private readonly _invalidateSubject: Subject<Action | Action[]> = new Subject();

  private readonly _refreshSubject: Subject<Action> = new Subject();

  public invalidateStream$: Observable<Action | Action[]> = this._invalidateSubject.asObservable();

  public refreshStream$: Observable<Action> = this._refreshSubject.asObservable();

  public emit(action: Action | Action[]) {
    this._invalidateSubject.next(action);
  }

  public emitRefresh(action: Action) {
    this._refreshSubject.next(action);
  }
}