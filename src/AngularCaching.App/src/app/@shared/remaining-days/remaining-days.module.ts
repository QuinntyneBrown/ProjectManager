import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemainingDaysComponent } from './remaining-days.component';



@NgModule({
  declarations: [
    RemainingDaysComponent
  ],
  exports: [
    RemainingDaysComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RemainingDaysModule { }
