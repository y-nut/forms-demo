import { CommonModule } from '@angular/common';
import {
  Component,
  Injector,
  Input,
  computed,
  inject,
  signal,
} from '@angular/core';
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
  productIdSignal = signal<number | null>(null);

  basketItem = computed(() => {
    const productId = this.productIdSignal();
    const basket = this.checkoutService.basket;
    if (typeof productId === 'number' && basket.has(productId)) {
      const item = basket.get(productId);
      if (item) {
        return item();
      }
    }
    return null;
  });

  @Input()
  set productId(productId: number) {
    this.productIdSignal.set(productId);
  }

  basket = this.checkoutService.basket;

  get checkoutService() {
    return this.injector.get(CheckoutService);
  }
}
