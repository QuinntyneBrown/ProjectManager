import { Directive } from '@angular/core';

@Directive({
  selector: '[appIconPill]',
  host: {
    class:'g-icon-pill'
  }
})
export class IconPillDirective { }
