import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Promotion } from '@api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promotion-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotion-card.component.html',
  styleUrls: ['./promotion-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionCardComponent {
  @Input() public promotion!: Promotion;
}
