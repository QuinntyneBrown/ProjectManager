import { AnyConstructor } from "@core/abstractions/any-constructor";
import { Observable, Subject } from "rxjs";
import { exhaustMap, filter, shareReplay, startWith, tap } from "rxjs/operators";
import { v4 as uuidv4 } from 'uuid';
import { Action, LogoutAction } from "./actions";

const dispatcher: Subject<Action | Action[]> = new Subject();

export const store =  <T extends AnyConstructor<object>>(base : T) =>
class Store extends base {
  private readonly _cacheKeyObservableMap: Map<string, Observable<any>> = new Map();
  private readonly _actionCacheKeysMap: Map<Action, string[]> = new Map();
  private readonly _id = uuidv4();

  protected refresh(action: Action | Action[]) { dispatcher.next(action); }

  constructor(...args: any[]) {
    super(...args);
    dispatcher
    .pipe(
      filter(action => !this._isRefreshAction(action)),
      tap(action => {
        let actions: Action[] = Array.isArray(action) ? (action as Action[]) : [action as Action];
        this._nullifyCacheEntriesThatDependOn(actions);

        if(actions[0] === LogoutAction) { return; }

        actions.forEach(a => dispatcher.next(this._createRefreshAction(a)))
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

  private _createRefreshAction(from: Action): Action {
    return `${from}:${this._id}`;
  }

  private _isRefreshAction(action:Action[] | Action):boolean {
    return !Array.isArray(action) && action.indexOf(this._id) > -1
  }

  private _anyActionsMappableTo(actions: Action[], refreshAction:Action):boolean {
    return actions.map(j => this._createRefreshAction(j)).indexOf(refreshAction) > -1
  }

  private _from<T>(key: string, func: { (): Observable<T> }): Observable<T> {
    if (!this._cacheKeyObservableMap.get(key)) {
      this._cacheKeyObservableMap.set(key, func().pipe(shareReplay(1)));
    }
    return this._cacheKeyObservableMap.get(key) as Observable<T>;
  }

  protected from$<T>(func: {(): Observable<T>}, actionOrActions: Action | Action[] = []): Observable<T> {
    if(Array.isArray(actionOrActions) && actionOrActions.length == 0) {
      actionOrActions.push(uuidv4())
    }

    const actions = Array.isArray(actionOrActions) ? actionOrActions : [actionOrActions];

    actions.push(LogoutAction);

    const cacheKey = actions[0];

    actions.forEach(action => this._updateActionCacheKeysMap(action, cacheKey));

    return dispatcher.pipe(
      filter((action:Action) => this._isRefreshAction(action) && this._anyActionsMappableTo(actions, action)),
      startWith(true),
      exhaustMap(_ => this._from<T>(cacheKey, func))
    );
  }

  private _updateActionCacheKeysMap(action: Action, key: string) {
    var cacheKey = this._actionCacheKeysMap.get(action);
    cacheKey = cacheKey || [];
    if (cacheKey.filter(x => x == key)[0] == null) {
      cacheKey.push(key);
    }
    this._actionCacheKeysMap.set(action, cacheKey);
  }

  protected withRefresh<T>(observable: Observable<T>, actions:Action | Action[]): Observable<T> {
    return observable.pipe(
      tap(_ => this.refresh(actions))
    );
  }
}
