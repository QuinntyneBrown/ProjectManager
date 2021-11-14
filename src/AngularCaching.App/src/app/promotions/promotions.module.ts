import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionsRoutingModule } from './promotions-routing.module';
import { PromotionsComponent } from './promotions.component';
import { MatIconModule } from '@angular/material/icon';
import { PromotionCardComponent, PromotionCardModule } from '@shared/cards';


@NgModule({
  declarations: [
    PromotionsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    PromotionCardModule,
    PromotionsRoutingModule
  ]
})
export class PromotionsModule { }
