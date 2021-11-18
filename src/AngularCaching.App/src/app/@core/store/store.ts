import { Observable, Subject } from "rxjs";
import { exhaustMap, filter, shareReplay, startWith, tap } from "rxjs/operators";
import { v4 as uuidv4 } from 'uuid';

export type Action = string;

const dispatcher: Subject<Action | Action[]> = new Subject();

export type AnyConstructor<A = object> = new (...args: any[]) => A

export const store =  <T extends AnyConstructor<object>>(base : T) =>
class Store extends base {
  private readonly _inner: Map<string, Observable<any>> = new Map();
  private readonly _invalidations: Map<string, string[]> = new Map();
  private readonly _id = uuidv4();

  protected refresh(action: Action | Action[]) { dispatcher.next(action); }

  constructor(...args: any[]) {
    super(...args);
    dispatcher
    .pipe(
      filter(x => !this._isRefreshAction(x)),
      tap(action => {
        let actions: Action[] = Array.isArray(action) ? (action as Action[]) : [action as Action];
        for (var i = 0; i < actions.length; i++) {
          const keys = this._invalidations.get(actions[i]) || [];
          for(let j = 0; j < keys.length; j++) {
            this._inner.set(keys[j], null);
          }
        }
        actions.forEach(a => dispatcher.next(`${a}:${this._id}`))
      })
    )
    .subscribe();
  }

  private _isRefreshAction(action:Action[] | Action):boolean {
    return !Array.isArray(action) && action.indexOf(this._id) > -1
  }

  private _from<T>(key: string, func: { (): Observable<T> }): Observable<T> {
    if (!this._inner.get(key)) {
      this._inner.set(key, func().pipe(shareReplay(1)));
    }
    return this._inner.get(key) as Observable<T>;
  }

  public from$<T>(func: {(): Observable<T>}, action: Action | Action[] = []): Observable<T> {
    if(Array.isArray(action) && action.length == 0) {
      action.push(uuidv4())
    }
    const actions = Array.isArray(action) ? action : [action];
    const key = actions[0];
    actions.forEach(a => this._register(key,a));
    return dispatcher.pipe(
      filter((x:string) => this._isRefreshAction(x) && actions.map(j => `${j}:${this._id}`).indexOf(x) > -1),
      startWith(action[0]),
      exhaustMap(_ => this._from<T>(key, func))
    );
  }

  private _register(key: string, action: Action) {
    var keys = this._invalidations.get(action);
    keys = keys || [];
    if (keys.filter(x => x == key)[0] == null) {
      keys.push(key);
    }
    this._invalidations.set(action, keys);
  }

  protected withRefresh<T>(observable: Observable<T>, actions:Action | Action[]): Observable<T> {
    return observable.pipe(
      tap(_ => this.refresh(actions))
    );
  }
}
