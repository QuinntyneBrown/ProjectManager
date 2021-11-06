import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appIconPill]'
})
export class IconPillDirective {

  constructor(
    elementRef: ElementRef<HTMLElement>
  ) {
    elementRef.nativeElement.classList.add('g-icon-pill')
  }

}
