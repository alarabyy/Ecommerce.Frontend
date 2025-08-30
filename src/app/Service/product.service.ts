import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: number; name: string; category: string; price: number;
  image: string; badge: 'HOT' | 'SALE' | 'NEW' | null;
  rating: number; oldPrice?: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Gaming PC Tower', category: 'Computers', price: 1899.00, image: 'https://i.imgur.com/sYv3iC7.png', badge: 'HOT', rating: 5 },
    { id: 2, name: 'Curved Monitor 32"', category: 'Monitors', price: 549.50, image: 'https://i.imgur.com/tTIZp14.png', badge: 'SALE', rating: 4, oldPrice: 699.00 },
    { id: 3, name: 'Wireless Mouse', category: 'Accessories', price: 79.00, image: 'https://i.imgur.com/VQKfJ5W.png', badge: 'NEW', rating: 5 },
    { id: 4, name: 'VR Headset Pro', category: 'Gaming', price: 499.00, image: 'https://i.imgur.com/nJm3h1y.png', badge: 'NEW', rating: 4 },
    { id: 5, name: 'Premium Espresso Machine', category: 'Kitchen', price: 349.00, image: 'https://i.imgur.com/8QpJa7k.png', badge: 'SALE', rating: 5, oldPrice: 499.00 },
    { id: 6, name: 'Latest Smartphone', category: 'Phones', price: 649.00, image: 'https://i.imgur.com/3bdc63g.png', badge: 'HOT', rating: 4, oldPrice: 799.00 },
    { id: 7, name: 'Smartwatch Series 8', category: 'Watches', price: 399.00, image: 'https://i.imgur.com/N7aG3c0.png', badge: null, rating: 5 },
    { id: 8, name: 'Air Pods Pro', category: 'Headphones', price: 199.00, image: 'https://i.imgur.com/Jz2q4xP.png', badge: 'SALE', rating: 4, oldPrice: 249.00 },
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getFeaturedProducts(): Observable<Product[]> {
    return of(this.products.slice(0, 4));
  }
}
