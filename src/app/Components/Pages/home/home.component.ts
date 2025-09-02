import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  features = [
    {
      icon: 'fas fa-shipping-fast',
      title: 'Fast & Free Shipping',
      description: 'Get your orders delivered to your doorstep in record time, completely free of charge.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Secure Payments',
      description: 'Your transactions are safe with our best-in-class, encrypted payment gateway.'
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Customer Support',
      description: 'Our dedicated support team is available around the clock to assist you with any query.'
    },
    {
      icon: 'fas fa-undo-alt',
      title: 'Hassle-Free Returns',
      description: 'Not satisfied? We offer a simple and straightforward 30-day return policy.'
    }
  ];

  testimonials = [
    {
      quote: 'This is the best e-commerce experience I have ever had. The products are high-quality and the shipping is incredibly fast!',
      author: 'Sarah J.',
      role: 'Tech Enthusiast'
    },
    {
      quote: 'I was hesitant to shop online, but ProStore made it so easy and secure. Their customer support is top-notch!',
      author: 'Michael B.',
      role: 'First-time Buyer'
    },
    {
      quote: 'Amazing deals and a fantastic selection of products. I found exactly what I was looking for. Highly recommended!',
      author: 'Emily K.',
      role: 'Gadget Lover'
    }
  ];

  constructor() { }
}
