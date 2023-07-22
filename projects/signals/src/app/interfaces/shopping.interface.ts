export interface Basket {
  productId: number;
  qty: number;
}

export interface Product {
  productId: number;
  productName: string;
  productImage: string;
  productStock: number;
  productPrice: string;
  productSalePrice: string;
  rating: number;
}
