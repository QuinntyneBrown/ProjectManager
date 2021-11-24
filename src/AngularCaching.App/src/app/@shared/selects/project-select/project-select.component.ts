import { ChangeDetectionStrategy, Component, forwardRef, Inject } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { Destroyable, ProjectStore } from '@core';
import { IProjectStore, PROJECT_STORE } from '@core/abstractions/stores';


@Component({
  selector: 'app-project-select',
  templateUrl: './project-select.component.html',
  styleUrls: ['./project-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProjectSelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSelectComponent extends Destroyable implements ControlValueAccessor  {

  public vm$ = this._projectStore
  .getProjects()
  .pipe(
    map(projects => ({ projects }))
  );

  public form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  constructor(
    @Inject(PROJECT_STORE) private readonly _projectStore: IProjectStore
  ) {
    super();
  }

  writeValue(obj: any): void {
    if(obj == null) {
      this.form.reset();
    }
    else {
        this.form.patchValue({ name: obj }, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges
    .pipe(takeUntil(this._destroyed$))
    .subscribe(fn);
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }
}
