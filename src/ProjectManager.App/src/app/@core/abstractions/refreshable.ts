import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class Destroyable {

  protected readonly _refresh$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this._refresh$.next();
    this._refresh$.complete();
  }
}
