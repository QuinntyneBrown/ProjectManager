import { Component, Input, OnInit } from '@angular/core';
import { Promotion } from '@api';

@Component({
  selector: 'app-promotion-card',
  templateUrl: './promotion-card.component.html',
  styleUrls: ['./promotion-card.component.scss']
})
export class PromotionCardComponent {

  @Input() public promotion!: Promotion;
}
