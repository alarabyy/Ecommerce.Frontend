import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule]
})
export class HomeComponent {

  popularCategories = [
    { name: 'Phones', icon: 'fas fa-mobile-alt' },
    { name: 'Laptops', icon: 'fas fa-laptop' },
    { name: 'Cameras', icon: 'fas fa-camera' },
    { name: 'Headphones', icon: 'fas fa-headphones' },
    { name: 'Gaming', icon: 'fas fa-gamepad' },
    { name: 'Watches', icon: 'fas fa-clock' },
    { name: 'TV & Audio', icon: 'fas fa-tv' },
    { name: 'Drones', icon: 'fas fa-paper-plane' }
  ];

  weeklyDeals = [
    { name: 'Latest Smartphone', oldPrice: 799, newPrice: 649, image: 'https://via.placeholder.com/80' },
    { name: 'Smartwatch Series 8', oldPrice: 450, newPrice: 399, image: 'https://via.placeholder.com/80' },
    { name: 'Air Pods Pro', oldPrice: 249, newPrice: 199, image: 'https://via.placeholder.com/80' },
    { name: '4K Android TV', oldPrice: 999, newPrice: 799, image: 'https://via.placeholder.com/80' }
  ];

  bestSellers = [
    { name: 'Gaming PC Tower', category: 'Computers', price: 1899.00, image: 'https://via.placeholder.com/300', badge: 'HOT' },
    { name: 'Curved Monitor 32"', category: 'Monitors', price: 549.50, image: 'https://via.placeholder.com/300', badge: 'SALE' },
    { name: 'Wireless Mouse', category: 'Accessories', price: 79.00, image: 'https://via.placeholder.com/300', badge: 'NEW' },
    { name: 'Espresso Machine', category: 'Kitchen', price: 499.00, image: 'https://via.placeholder.com/300', badge: 'SALE' }
  ];

}
