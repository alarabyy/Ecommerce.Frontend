// home.component.ts
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';

// Interfaces
interface Product { id: number; name: string; price: number; originalPrice?: number; description: string; categoryName: string; rating: number; reviewCount: number; inStock: boolean; quantity: number; image: string; tag?: 'Sale' | 'New'; }
interface Testimonial { name: string; role: string; quote: string; avatar: string; }
interface ShowcaseCategory { name: string; icon: string; productCount: number; }
interface Brand { name: string; logoUrl: string; }
interface Feature { icon: string; title: string; description: string; }
interface HeroSlide { title: string; subtitle: string; image: string; link: string; }
interface LifestyleCategory { name: string; description: string; image: string; }
interface Article { title: string; category: string; image: string; link: string; }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  // --- Component State ---
  showSplashScreen = true;
  isLoading: boolean = true;
  private intersectionObserver: IntersectionObserver | null = null;
  private countdownInterval: any;
  private sliderInterval: any; // Added to manage slider interval

  // --- Page Data Arrays ---
  heroSlides: HeroSlide[] = [];
  features: Feature[] = [];
  lifestyleCategories: LifestyleCategory[] = [];
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  articles: Article[] = [];
  testimonials: Testimonial[] = []; // Now with data
  showcaseCategories: ShowcaseCategory[] = [];
  featuredBrands: Brand[] = [];

  // --- Interactive State ---
  categories: string[] = [];
  selectedCategory: string = 'Mobile';
  currentSlide = 0;

  // Countdown Timer State
  saleEndDate = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000); // Sale ends in 3 days
  countdown = { days: '00', hours: '00', minutes: '00', seconds: '00' };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => { this.showSplashScreen = false; }, 2000);
      this.startCountdown();
    } else {
      this.showSplashScreen = false;
    }
    this.loadInitialData();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
      // Auto-play hero slider, now with interval cleanup
      this.sliderInterval = setInterval(() => this.nextSlide(), 5000);
    }
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) this.intersectionObserver.disconnect();
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    if (this.sliderInterval) clearInterval(this.sliderInterval); // Cleanup slider interval
  }

  // --- Data Loading ---
  private loadInitialData(): void {
    setTimeout(() => {
      this.heroSlides = [
        { title: 'The Future of Sound', subtitle: 'Experience immersive audio with our new line of wireless headphones.', image: 'image5.png', link: '#' },
        { title: 'Capture Every Moment', subtitle: 'Discover our professional cameras and bring your stories to life.', image: 'image4.png', link: '#' },
        { title: 'Power and Precision', subtitle: 'Explore the latest laptops and tablets for work and creativity.', image: 'image3.png', link: '#' },
      ];
      this.features = [
        { icon: 'fas fa-shipping-fast', title: 'Fast & Free Shipping', description: 'On all orders over $100' },
        { icon: 'fas fa-shield-alt', title: 'Secure Payment', description: '100% secure payment protection' },
        { icon: 'fas fa-headset', title: '24/7 Support', description: 'Dedicated support team' },
        { icon: 'fas fa-sync-alt', title: '14-Day Returns', description: 'Easy and hassle-free returns' },
      ];
      this.lifestyleCategories = [
        { name: 'For Creators', description: 'Gear to bring your ideas to life.', image: 'image9.png' },
        { name: 'For Gamers', description: 'Dominate the virtual world.', image: 'image8.png' },
        { name: 'For Adventurers', description: 'Durable tech for the great outdoors.', image: 'image7.png' },
      ];
      this.allProducts = [
        { id: 1, name: 'Galaxy Note20 Ultra', price: 2780, description: 'A powerful device for work and play.', categoryName: 'Mobile', rating: 5, reviewCount: 51, inStock: true, quantity: 52, image: 'image1.png' },
        { id: 2, name: 'iPad 10th Gen', price: 1780, originalPrice: 1980, description: 'Colorful, capable, and creatively designed.', categoryName: 'Tablet', rating: 4, reviewCount: 33, inStock: true, quantity: 52, image: 'image10.png', tag: 'Sale' },
        { id: 3, name: 'Galaxy S20 FE 5G', price: 2780, description: 'All you want, to do all you love.', categoryName: 'Mobile', rating: 5, reviewCount: 64, inStock: true, quantity: 52, image: 'image3.png' },
        { id: 4, name: 'Samsung S21 Ultra', price: 2950, description: 'The ultimate smartphone with a pro-grade camera.', categoryName: 'Mobile', rating: 5, reviewCount: 98, inStock: true, quantity: 52, image: 'image4.png', tag: 'New' },
        { id: 6, name: 'Apple Watch Ultra', price: 3200, description: 'The most rugged and capable Apple Watch ever.', categoryName: 'Watch', rating: 5, reviewCount: 120, inStock: true, quantity: 30, image: 'image6.png', tag: 'New' },
        { id: 7, name: 'Sony Alpha 7 IV', price: 4500, originalPrice: 4800, description: 'Hybrid camera with breathtaking image quality.', categoryName: 'Camera', rating: 5, reviewCount: 88, inStock: true, quantity: 15, image: 'image7.png', tag: 'Sale' },
        { id: 8, name: 'Beats Studio Buds', price: 650, description: 'True wireless noise cancelling earbuds.', categoryName: 'Accessories', rating: 4, reviewCount: 210, inStock: true, quantity: 100, image: 'image8.png' },
        { id: 10, name: 'DJI Mavic Air 3', price: 3800, description: 'Dual-camera drone with stunning aerial capabilities.', categoryName: 'Drones', rating: 5, reviewCount: 75, inStock: true, quantity: 25, image: 'image9.png', tag: 'New' },
      ];
      this.articles = [
        { title: 'The Ultimate Guide to Choosing Your First Drone', category: 'Guides', image: 'image4.png', link: '#' },
        { title: 'Top 5 Noise-Cancelling Headphones of the Year', category: 'Reviews', image: 'image5.png', link: '#' },
        { title: 'How to Build the Perfect Gaming Setup on a Budget', category: 'Tips & Tricks', image: 'image7.png', link: '#' },
      ];
      this.testimonials = [
        { name: 'Jane Doe', role: 'Tech Enthusiast', quote: 'The service was incredible, and the product quality exceeded my expectations. Highly recommended!', avatar: 'avatar1.png' },
        { name: 'John Smith', role: 'Professional Photographer', quote: 'I found the perfect camera for my needs. The delivery was fast and the product was exactly as described.', avatar: 'avatar2.png' },
        { name: 'Sarah Lee', role: 'Digital Creator', quote: 'Their range of products for creators is unmatched. I will definitely be a returning customer.', avatar: 'avatar3.png' },
      ];
      this.featuredBrands = [
        { name: 'Apple', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
        { name: 'Samsung', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
        { name: 'Google', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
        { name: 'Microsoft', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
      ];

      this.categories = [...new Set(this.allProducts.map(p => p.categoryName))];
      this.filterProducts(this.selectedCategory);
      this.isLoading = false;
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => this.reobserveElements(), 50);
      }
    }, 1000);
  }

  // --- Component Methods ---

  // Hero Slider
  nextSlide(): void { this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length; }
  prevSlide(): void { this.currentSlide = (this.currentSlide - 1 + this.heroSlides.length) % this.heroSlides.length; }
  selectSlide(index: number): void { this.currentSlide = index; }

  // Product Filtering
  filterProducts(category: string): void {
    this.selectedCategory = category;
    this.filteredProducts = this.allProducts.filter(p => p.categoryName === category);
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.reobserveElements(), 50);
    }
  }

  // Countdown Timer
  private startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = this.saleEndDate.getTime() - now;

      if (distance < 0) {
        clearInterval(this.countdownInterval);
        this.countdown = { days: '00', hours: '00', minutes: '00', seconds: '00' };
        return;
      }

      this.countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
      this.countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
      this.countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      this.countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }, 1000);
  }

  // --- Animation & Utility ---
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
