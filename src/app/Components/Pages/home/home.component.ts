import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Product, ProductService } from '../../../Service/product.service';
import { ProductCardComponent } from '../../Widgets/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  featuredProducts$: Observable<Product[]>;

  popularCategories = [
    { name: 'Phones', icon: 'fas fa-mobile-alt' },
    { name: 'Laptops', icon: 'fas fa-laptop' },
    { name: 'Cameras', icon: 'fas fa-camera' },
    { name: 'Headphones', icon: 'fas fa-headphones' },
    { name: 'Gaming', icon: 'fas fa-gamepad' },
    { name: 'Watches', icon: 'fas fa-clock' }
  ];

  weeklyDeals = [
    { name: 'Latest Smartphone', oldPrice: 799, newPrice: 649, image: 'https://i.imgur.com/3bdc63g.png' },
    { name: 'Smartwatch Series 8', oldPrice: 450, newPrice: 399, image: 'https://i.imgur.com/N7aG3c0.png' },
    { name: 'Air Pods Pro', oldPrice: 249, newPrice: 199, image: 'https://i.imgur.com/Jz2q4xP.png' },
    { name: '4K Android TV', oldPrice: 999, newPrice: 799, image: 'https://i.imgur.com/4Jp1hYJ.png' }
  ];

  constructor(private productService: ProductService) {
    this.featuredProducts$ = this.productService.getFeaturedProducts();
  }
}
