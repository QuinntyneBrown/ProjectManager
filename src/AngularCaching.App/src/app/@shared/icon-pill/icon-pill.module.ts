import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconPillDirective } from './icon-pill.directive';



@NgModule({
  declarations: [
    IconPillDirective
  ],
  exports: [
    IconPillDirective
  ],
  imports: [
    CommonModule
  ]
})
export class IconPillModule { }
