import {
  CreateComputedOptions,
  Injectable,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { Basket, Product } from '../interfaces/shopping.interface';
@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  readonly basket = new Map<number, WritableSignal<Basket>>([]);
  readonly products = signal<Product[]>(products);
  readonly totalNormalPrice = signal(0);
  readonly enablePromoCode = signal(false);

  // ! Computed
  readonly numberOfProducts = computed(
    () => {
      const products = this.products();
      return products.length;
    },
    <CreateComputedOptions<number>>{
      exact: (a: number, b: number) => a === b,
    }
  );

  // ! Update
  addProduct(productId: number | undefined, qty: number): void {
    if (typeof productId !== 'number' || typeof qty !== 'number') {
      return;
    }
    const itemSignal = this.basket.get(productId);
    if (itemSignal) {
      itemSignal.update((item) => {
        item.qty += qty;
        return item;
      });
    } else {
      this.basket.set(
        productId,
        signal({
          productId,
          qty,
        })
      );
    }

    if (itemSignal && !itemSignal().qty) {
      this.basket.delete(productId);
    }

    this.calculateTotal();
  }

  // ! Mutate
  applyPromoCode(promoCodeValid: boolean): void {
    this.enablePromoCode.set(promoCodeValid);
    this.products.mutate((products) => {
      const discount = promoCodeValid ? 0.8 : 1;
      products.forEach((product) => {
        if (discount === 1) {
          product.productSalePrice = product.productPrice;
        } else {
          product.productSalePrice = (
            parseFloat(product.productPrice) * discount
          ).toFixed(2);
        }
      });
    });

    this.calculateTotal();
  }

  // ! Set
  private calculateTotal(): void {
    if (!this.basket.size) {
      this.totalNormalPrice.set(0);
    }
    const total = Array.from(this.basket.values()).reduce((acc, itemSignal) => {
      const item = itemSignal();
      const product = this.products().find(
        (product) => product.productId === item.productId
      );
      if (product) {
        acc += parseFloat(product.productSalePrice) * item.qty;
      }
      return acc;
    }, 0);

    this.totalNormalPrice.set(total);
  }
}

const products: Product[] = [
  {
    productId: 1000,
    productName: 'sweet chocolate Ilise',
    productImage: 'https://picsum.photos/400?image=659',
    productStock: 81,
    productPrice: '23488.67',
    productSalePrice: '23488.67',
    rating: 4,
  },
  {
    productId: 1001,
    productName: 'civilian salmon Delinda',
    productImage: 'https://picsum.photos/400?image=261',
    productStock: 66,
    productPrice: '42992.62',
    productSalePrice: '20636.46',
    rating: 2,
  },
  {
    productId: 1002,
    productName: 'northern chocolate Dagmar',
    productImage: 'https://picsum.photos/400?image=921',
    productStock: 58,
    productPrice: '26956.67',
    productSalePrice: '26956.67',
    rating: 4,
  },
  {
    productId: 1003,
    productName: 'spatial plum Mattie',
    productImage: 'https://picsum.photos/400?image=753',
    productStock: 74,
    productPrice: '32827.45',
    productSalePrice: '32827.45',
    rating: 2,
  },
  {
    productId: 1004,
    productName: 'arrogant tan Nelia',
    productImage: 'https://picsum.photos/400?image=924',
    productStock: 85,
    productPrice: '27379.36',
    productSalePrice: '9308.98',
    rating: 4,
  },
  {
    productId: 1005,
    productName: 'following bronze Misti',
    productImage: 'https://picsum.photos/400?image=340',
    productStock: 24,
    productPrice: '34617.96',
    productSalePrice: '34617.96',
    rating: 3,
  },
  {
    productId: 1006,
    productName: 'continued rose Nesta',
    productImage: 'https://picsum.photos/400?image=712',
    productStock: 34,
    productPrice: '27822.85',
    productSalePrice: '27822.85',
    rating: 1,
  },
  {
    productId: 1007,
    productName: 'sufficient peach Georgiana',
    productImage: 'https://picsum.photos/400?image=860',
    productStock: 55,
    productPrice: '15506.06',
    productSalePrice: '15506.06',
    rating: 4,
  },
  {
    productId: 1008,
    productName: 'frequent sapphire Petronella',
    productImage: 'https://picsum.photos/400?image=913',
    productStock: 36,
    productPrice: '44132.59',
    productSalePrice: '44132.59',
    rating: 5,
  },
  {
    productId: 1009,
    productName: 'indirect indigo Fiona',
    productImage: 'https://picsum.photos/400?image=583',
    productStock: 49,
    productPrice: '40702.21',
    productSalePrice: '4477.24',
    rating: 1,
  },
  {
    productId: 1010,
    productName: 'gross plum Veriee',
    productImage: 'https://picsum.photos/400?image=306',
    productStock: 12,
    productPrice: '42194.21',
    productSalePrice: '42194.21',
    rating: 4,
  },
];
