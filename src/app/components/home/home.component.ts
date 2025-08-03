import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';

// Interfaces
interface Product { id: number; name: string; price: number; originalPrice?: number; description: string; categoryName: string; rating: number; reviewCount: number; inStock: boolean; quantity: number; image: string; tag?: 'Sale' | 'New'; }
interface Testimonial { name: string; role: string; quote: string; avatar: string; }
interface ShowcaseCategory { name: string; icon: string; productCount: number; }
interface Brand { name: string; logoUrl: string; }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  showSplashScreen = true;
  isLoading: boolean = true;

  // Data Arrays
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  testimonials: Testimonial[] = [];
  showcaseCategories: ShowcaseCategory[] = [];
  featuredBrands: Brand[] = [];

  // State
  categories: string[] = [];
  selectedCategory: string = 'Mobile';
  private intersectionObserver: IntersectionObserver | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => { this.showSplashScreen = false; }, 2000);
    } else {
      this.showSplashScreen = false;
    }
    this.loadInitialData();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
    }
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) this.intersectionObserver.disconnect();
  }

  private loadInitialData(): void {
    setTimeout(() => {
      this.allProducts = [
        // Using local images directly
        { id: 1, name: 'Galaxy Note20 Ultra 5G', price: 2780, description: '...', categoryName: 'Mobile', rating: 5, reviewCount: 51, inStock: true, quantity: 52, image: 'image1.png'},
        { id: 2, name: 'iPad 10th Generation', price: 1780, originalPrice: 1980, description: '...', categoryName: 'Tablet', rating: 4, reviewCount: 33, inStock: true, quantity: 52, image: 'image2.png', tag: 'Sale' },
        { id: 3, name: 'Galaxy S20 FE 5G', price: 2780, description: '...', categoryName: 'Mobile', rating: 5, reviewCount: 64, inStock: true, quantity: 52, image: 'image3.png' },
        { id: 4, name: 'Samsung S21 Ultra', price: 2780, description: '...', categoryName: 'Mobile', rating: 5, reviewCount: 98, inStock: true, quantity: 52, image: 'image4.png', tag: 'New' },
        { id: 5, name: 'Samsung Galaxy Note 20', price: 2780, description: '...', categoryName: 'Mobile', rating: 4, reviewCount: 45, inStock: true, quantity: 52, image: 'image5.png' },
        { id: 6, name: 'Apple Watch Ultra', price: 3200, description: '...', categoryName: 'Watch', rating: 5, reviewCount: 120, inStock: true, quantity: 30, image: 'image6.png', tag: 'New' },
        { id: 7, name: 'Sony Alpha 7 IV', price: 4500, originalPrice: 4800, description: '...', categoryName: 'Camera', rating: 5, reviewCount: 88, inStock: true, quantity: 15, image: 'image1.png', tag: 'Sale' },
        { id: 8, name: 'Beats Studio Buds', price: 650, description: '...', categoryName: 'Accessories', rating: 4, reviewCount: 210, inStock: true, quantity: 100, image: 'image2.png' },
        { id: 9, name: 'Apple HomePod Mini', price: 400, description: '...', categoryName: 'Speaker', rating: 5, reviewCount: 150, inStock: true, quantity: 60, image: 'image3.png' },
      ];

      this.showcaseCategories = [
          { name: 'Phones', icon: 'fas fa-mobile-alt', productCount: 120 },
          { name: 'Laptops', icon: 'fas fa-laptop', productCount: 45 },
          { name: 'Gaming', icon: 'fas fa-gamepad', productCount: 88 },
          { name: 'Cameras', icon: 'fas fa-camera-retro', productCount: 32 },
          { name: 'Headsets', icon: 'fas fa-headphones-alt', productCount: 95 },
          { name: 'Drones', icon: 'fas fa-helicopter', productCount: 18 },
      ];

      this.featuredBrands = [
          { name: 'Apple', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
          { name: 'Samsung', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
          { name: 'Sony', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg' },
          { name: 'Google', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
          { name: 'Bose', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Bose_logo.svg/1280px-Bose_logo.svg.png'},
          { name: 'DJI', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Dji_logo_black.svg/1280px-Dji_logo_black.svg.png'}
      ];

      this.categories = ['Mobile', 'Watch', 'Camera', 'Accessories', 'Speaker', 'Tablet'];
      this.filterProducts(this.selectedCategory);

      this.isLoading = false;
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => this.reobserveElements(), 50);
      }
    }, 1000);
  }

  filterProducts(category: string): void {
    this.selectedCategory = category;
    this.filteredProducts = this.allProducts.filter(p => p.categoryName === category);

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.reobserveElements(), 50);
    }
  }

  private initScrollAnimations(): void {
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.intersectionObserver?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    this.reobserveElements();
  }

  private reobserveElements(): void {
    if (!this.intersectionObserver) return;
    document.querySelectorAll('.animate-on-scroll:not(.visible)').forEach(el => {
        this.intersectionObserver?.observe(el)
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
