import { CommonModule } from '@angular/common';
import { Component, Injector, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CheckoutService } from '../services/checkout.service';
import { QtyComponent } from './qty/qty.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, QtyComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  private injector = inject(Injector);

  products = this.checkoutService.products;
  basket = this.checkoutService.basket;
  enablePromoCode = this.checkoutService.enablePromoCode;

  get checkoutService() {
    return this.injector.get(CheckoutService);
  }
}
