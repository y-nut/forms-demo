import { CommonModule } from '@angular/common';
import { Component, Injector, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent {
  private injector = inject(Injector);

  basket = this.injector.get(CheckoutService).basket;
  totalNormalPrice = this.injector.get(CheckoutService).totalNormalPrice;
}
