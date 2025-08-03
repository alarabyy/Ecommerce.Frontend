import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';

// Interfaces (No changes needed)
interface Product {
  id: number; name: string; price: number; originalPrice?: number; discount?: number;
  description: string; icon: string; categoryId: number; categoryName: string;
  rating: number; reviewCount: number; inStock: boolean; quantity?: number;
}
interface Category { id: number; name: string; icon: string; }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  // Properties
  private allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  featuredProducts: Product[] = [];

  isLoading: boolean = true;
  searchTerm: string = '';
  newsletterEmail: string = '';
  fabMenuOpen: boolean = false;

  private intersectionObserver: IntersectionObserver | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    this.loadInitialData();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
    }
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private loadInitialData(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.categories = [
        { id: 1, name: 'Electronics', icon: 'fas fa-laptop-code' },
        { id: 2, name: 'Apparel', icon: 'fas fa-tshirt' },
        { id: 3, name: 'Books', icon: 'fas fa-book-open' },
        { id: 4, name: 'Gadgets', icon: 'fas fa-microchip' },
        { id: 5, name: 'Gaming', icon: 'fas fa-gamepad' },
      ];

      this.allProducts = [
        { id: 1, name: 'Pro Laptop X1', price: 1499, originalPrice: 1799, discount: 17, description: 'High-performance laptop for professionals.', icon: 'fas fa-laptop-code', categoryId: 1, categoryName: 'Electronics', rating: 5, reviewCount: 312, inStock: true, quantity: 15 },
        { id: 2, name: 'Immersive Headset', price: 175, originalPrice: 220, discount: 20, description: '7.1 surround sound for total immersion.', icon: 'fas fa-headset', categoryId: 5, categoryName: 'Gaming', rating: 4.5, reviewCount: 450, inStock: true, quantity: 8 },
        { id: 3, name: 'Urban Tech Jacket', price: 89, description: 'Lightweight, durable, and stylishly modern.', icon: 'fas fa-tshirt', categoryId: 2, categoryName: 'Apparel', rating: 4, reviewCount: 180, inStock: true, quantity: 5 },
        { id: 4, name: 'The Art of Code', price: 35, description: 'A must-read for aspiring developers.', icon: 'fas fa-book-open', categoryId: 3, categoryName: 'Books', rating: 5, reviewCount: 150, inStock: true, quantity: 30 },
        { id: 5, name: 'Chrono-Smartwatch V3', price: 299, originalPrice: 350, discount: 15, description: 'Your life, organized on your wrist.', icon: 'fas fa-stopwatch-20', categoryId: 4, categoryName: 'Gadgets', rating: 4, reviewCount: 255, inStock: false, quantity: 0 },
        { id: 6, name: 'Pro Wireless Controller', price: 65, description: 'Ergonomic design, zero latency.', icon: 'fas fa-gamepad', categoryId: 5, categoryName: 'Gaming', rating: 5, reviewCount: 620, inStock: true, quantity: 22 },
      ];

      this.filteredProducts = [...this.allProducts];
      this.featuredProducts = this.allProducts.filter(p => p.rating >= 4.5).slice(0, 3);
      this.isLoading = false;

      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => this.reobserveElements(), 50);
      }
    }, 1000);
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
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => this.intersectionObserver?.observe(el));
  }

  applyFilters(categoryId?: number): void {
    if (categoryId) {
        // If a category is clicked, set the search term to empty
        this.searchTerm = '';
    }

    let products = [...this.allProducts];

    // Filter by category if one is selected
    const selectedCategoryId = categoryId ?? (document.querySelector('.filter-select') as HTMLSelectElement)?.value;
    if (selectedCategoryId) {
        products = products.filter(p => p.categoryId === Number(selectedCategoryId));
    }

    // Then filter by search term
    if (this.searchTerm.trim()) {
      const lowercasedTerm = this.searchTerm.toLowerCase();
      products = products.filter(p => p.name.toLowerCase().includes(lowercasedTerm));
    }

    this.filteredProducts = products;

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.reobserveElements(), 50);
    }
  }

  formatPrice(price: number): string { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price); }
  trackByProductId(index: number, product: Product): number { return product.id; }
  toggleFabMenu(): void { this.fabMenuOpen = !this.fabMenuOpen; }
  onNewsletterSubmit(): void { if (this.newsletterEmail.trim()) { alert(`Thank you for subscribing, ${this.newsletterEmail}!`); this.newsletterEmail = ''; } }
  refreshData(): void { this.searchTerm = ''; this.loadInitialData(); }
  scrollToSection(sectionId: string): void { if (isPlatformBrowser(this.platformId)) { document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }); } }
  getStockStatusText(product: Product): string { if (!product.inStock) return 'Out of Stock'; if (product.quantity && product.quantity <= 5) return `Only ${product.quantity} left!`; return 'In Stock'; }
}
