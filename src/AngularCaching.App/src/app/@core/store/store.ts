import { AnyConstructor } from "@core/abstractions/any-constructor";
import { Observable, of, Subject } from "rxjs";
import { exhaustMap, filter, map, shareReplay, startWith, switchMap, tap } from "rxjs/operators";
import { v4 as uuidv4 } from 'uuid';
import { Action, LogoutAction, StateChangedAction } from "./actions";

const dispatcher: Subject<Action | Action[]> = new Subject();

export const store =  <T extends AnyConstructor<object>>(base : T) =>
class extends base {
  private readonly _cacheKeyObservableMap: Map<string, Observable<any>> = new Map();
  private readonly _actionCacheKeysMap: Map<Action, string[]> = new Map();
  private readonly _id = uuidv4();

  constructor(...args: any[]) {
    super(...args);
    dispatcher
    .pipe(
      filter(action => this._isNullifyAction(action)),
      tap(action => {
        let actions: Action[] = Array.isArray(action) ? (action as Action[]) : [action as Action];
        this._nullifyCacheEntriesThatDependOn(actions);

        if(actions[0] === LogoutAction) {

          this._cacheKeyObservableMap.forEach((_,key) => {
            dispatcher.next(this._toStateChangedAction(key));
          });

          return;
        }

        actions.forEach(a => dispatcher.next(this._toRefreshAction(a)))
      })
    )
    .subscribe();
  }

  private _nullifyCacheEntriesThatDependOn(actions:Action[]) {
    for (var i = 0; i < actions.length; i++) {
      const cacheKeys = this._actionCacheKeysMap.get(actions[i]) || [];
      for(let j = 0; j < cacheKeys.length; j++) {
        this._cacheKeyObservableMap.set(cacheKeys[j], null);
      }
    }
  }

  private _toRefreshAction(action: Action): Action {
    return `${action}:${this._id}`;
  }

  private _toStateChangedAction(action: Action | Action[]): Action {
    return Array.isArray(action) ? null : `${action}:${StateChangedAction}`;
  }

  private _toActionArray(actionOrActions: Action | Action[] = []): Action[] {
    if(Array.isArray(actionOrActions) && actionOrActions.length == 0) {
      actionOrActions.push(uuidv4())
    }
    return Array.isArray(actionOrActions) ? actionOrActions : [actionOrActions];
  }

  private _isRefreshAction(action:Action[] | Action):boolean {
    return action && action != this._toStateChangedAction(action) && !Array.isArray(action) && action.indexOf(this._id) > -1
  }

  private _isNullifyAction(action: Action[] | Action): boolean {
    return action && action != this._toStateChangedAction(action) && !this._isRefreshAction(action);
  }

  private _anyActionsMappableTo(actions: Action[], refreshAction:Action):boolean {
    return actions.map(j => this._toRefreshAction(j)).indexOf(refreshAction) > -1
  }

  private _from<T>(key: string, func: { (): Observable<T> }): Observable<T> {
    if (!this._cacheKeyObservableMap.get(key)) {

      const obs$ = func().pipe(shareReplay(1));

      this._cacheKeyObservableMap.set(key, obs$);
    }

    dispatcher.next(this._toStateChangedAction(key));

    return this._cacheKeyObservableMap.get(key);
  }

  protected from$<T>(func: {(): Observable<T>}, actionOrActions: Action | Action[] = []): Observable<T> {

    const actions = this._toActionArray(actionOrActions);

    actions.push(LogoutAction);

    const cacheKey = actions[0];

    actions.forEach(action => this._insertActionCacheKeyMapEntry(action, cacheKey));

    return dispatcher.pipe(
      filter((action:Action) => this._isRefreshAction(action) && this._anyActionsMappableTo(actions, action)),
      startWith(true),
      exhaustMap(_ => this._from<T>(cacheKey, func))
    );
  }

  private _insertActionCacheKeyMapEntry(action: Action, key: string) {
    var cacheKey = this._actionCacheKeysMap.get(action);
    cacheKey = cacheKey || [];
    if (cacheKey.filter(x => x == key)[0] == null) {
      cacheKey.push(key);
    }
    this._actionCacheKeysMap.set(action, cacheKey);
  }

  protected withRefresh<T>(observable: Observable<T>, actions:Action | Action[]): Observable<T> {
    return observable.pipe(
      tap(_ => dispatcher.next(actions))
    );
  }

  public select<T>(cacheKey: string): Observable<T> {
    return dispatcher
    .pipe(
      filter(action => action == this._toStateChangedAction(cacheKey)),
      startWith(true),
      map(_ => this._cacheKeyObservableMap.get(cacheKey)),
      switchMap(obs$ => obs$ ? obs$ : of(null))
    )
  }
}
