import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionCardComponent } from './promotion-card.component';



@NgModule({
  declarations: [
    PromotionCardComponent
  ],
  exports: [
    PromotionCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PromotionCardModule { }
