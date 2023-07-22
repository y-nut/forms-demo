import { CommonModule } from '@angular/common';
import { Component, Injector, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-qty',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './qty.component.html',
  styleUrls: ['./qty.component.scss'],
})
export class QtyComponent {
  private injector = inject(Injector);
  checkoutService = this.injector.get(CheckoutService);
  basket = this.checkoutService.basket;

  @Input() productId: number | undefined;
}
