import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Action } from './actions';

@Injectable({
  providedIn: "root"
})
export class Dispatcher {
  private readonly _actionsSubject: Subject<Action | Action[]> = new Subject();

  public readonly actions$: Observable<Action | Action[]> = this._actionsSubject.asObservable();

  public emit(action: Action | Action[]) {
    this._actionsSubject.next(action);
  }
}
