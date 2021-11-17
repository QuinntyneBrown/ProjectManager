import { Observable, Subject } from "rxjs";
import { exhaustMap, filter, shareReplay, startWith, tap } from "rxjs/operators";

export type Action = string;

export function guid() {
  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

const dispatcher: Subject<Action | Action[]> = new Subject();

export type AnyConstructor<A = object> = new (...input: any[]) => A

export const storeMixin =  <T extends AnyConstructor<object>>(base : T) =>
class Store extends base {
  private readonly _inner: Map<string, Observable<any>> = new Map();
  private readonly _invalidations: Map<string, string[]> = new Map();
  private readonly _id = guid();

  public refresh(action: Action | Action[]) {
    dispatcher.next(action);
  }

  constructor(...args: any[]) {
    super(...args);
    this.subscribeToDispatcher();
  }

  public subscribeToDispatcher() {
    dispatcher
    .pipe(
      filter(x => !this._isRefreshAction(x)),
      tap(action => {
        let actions: Action[] = Array.isArray(action) ? (action as Action[]) : [action as Action];
        for (var i = 0; i < actions.length; i++) {
          const keys = this._invalidations.get(actions[i]);
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

  public from$<T>(func: any, action: string | string[] = []): Observable<T> {
    if(Array.isArray(action) && action.length ==0) {
      action.push(guid())
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
}
