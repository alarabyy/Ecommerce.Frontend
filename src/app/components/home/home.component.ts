import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';

// Interfaces
interface Product { id: number; name: string; price: number; originalPrice?: number; discount?: number; description: string; icon: string; categoryId: number; categoryName: string; rating: number; reviewCount: number; inStock: boolean; quantity?: number; }
interface Testimonial { name: string; role: string; quote: string; avatar: string; }
interface Feature { icon: string; title: string; description: string; }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  showSplashScreen = true;
  allProducts: Product[] = [];
  testimonials: Testimonial[] = [];
  features: Feature[] = [];
  dealOfTheDay?: Product;
  countdown: { days: number; hours: number; minutes: number; seconds: number } = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private countdownInterval: any;
  currentTestimonialIndex = 0;
  private testimonialInterval: any;
  isLoading: boolean = true;
  private intersectionObserver: IntersectionObserver | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => { this.showSplashScreen = false; }, 3000);
    } else {
      this.showSplashScreen = false;
    }
    this.loadInitialData();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
      this.startTestimonialSlider();
    }
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) this.intersectionObserver.disconnect();
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    if (this.testimonialInterval) clearInterval(this.testimonialInterval);
  }

  private loadInitialData(): void {
    setTimeout(() => {
      this.allProducts = [
        { id: 1, name: 'Quantum Laptop X1', price: 1499, originalPrice: 1799, discount: 17, description: 'Unleash hyperspeed performance.', icon: 'fas fa-laptop-code', categoryId: 1, categoryName: 'Electronics', rating: 5, reviewCount: 312, inStock: true, quantity: 15 },
        { id: 2, name: 'Aura Gaming Headset', price: 175, originalPrice: 220, discount: 20, description: '7.1 surround sound for immersion.', icon: 'fas fa-headset', categoryId: 5, categoryName: 'Gaming', rating: 4.5, reviewCount: 450, inStock: true, quantity: 8 },
        { id: 3, name: 'Cyberpunk Jacket', price: 89, description: 'Lightweight, durable, and stylish.', icon: 'fas fa-tshirt', categoryId: 2, categoryName: 'Apparel', rating: 4, reviewCount: 180, inStock: true, quantity: 5 },
        { id: 4, name: 'The Art of Code', price: 35, description: 'A must-read for developers.', icon: 'fas fa-book-open', categoryId: 3, categoryName: 'Books', rating: 5, reviewCount: 150, inStock: true, quantity: 30 },
        { id: 5, name: 'Chrono-Smartwatch V3', price: 299, originalPrice: 350, discount: 15, description: 'Your life, organized on your wrist.', icon: 'fas fa-stopwatch-20', categoryId: 4, categoryName: 'Gadgets', rating: 4, reviewCount: 255, inStock: false, quantity: 0 },
        { id: 6, name: 'Nebula Wireless Controller', price: 65, description: 'Ergonomic design, zero latency.', icon: 'fas fa-gamepad', categoryId: 5, categoryName: 'Gaming', rating: 5, reviewCount: 620, inStock: true, quantity: 22 },
      ];
      this.dealOfTheDay = this.allProducts.find(p => p.id === 2);
      this.features = [
        { icon: 'fas fa-shipping-fast', title: 'Lightning-Fast Shipping', description: 'Get your tech goodies delivered to your door in record time.' },
        { icon: 'fas fa-headset', title: '24/7 Expert Support', description: 'Our dedicated support team is always here to help you out.' },
        { icon: 'fas fa-check-circle', title: 'Premium Quality Guaranteed', description: 'We only source the best products, ensuring top-tier quality.' },
      ];
      this.testimonials = [
        { name: 'Alex Johnson', role: 'Developer', quote: 'The quality of the products is insane! My new setup has never looked better.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
        { name: 'Maria Garcia', role: 'Gamer', quote: 'Fastest shipping I have ever experienced. The controller arrived in less than a day!', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
        { name: 'Chris Lee', role: 'Designer', quote: 'A fantastic selection and the customer support was incredibly helpful. Highly recommend!', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
      ];
      this.isLoading = false;
      if (isPlatformBrowser(this.platformId)) {
        this.startCountdown();
        setTimeout(() => this.reobserveElements(), 50);
      }
    }, 1000);
  }

  private startCountdown(): void {
    const target = new Date().getTime() + 24 * 3600 * 1000;
    this.countdownInterval = setInterval(() => {
      const d = target - new Date().getTime();
      if (d < 0) {
        clearInterval(this.countdownInterval);
        return;
      }
      this.countdown = {
        days: Math.floor(d / (1000 * 60 * 60 * 24)),
        hours: Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((d % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((d % (1000 * 60)) / 1000)
      };
    }, 1000);
  }

  private startTestimonialSlider(): void {
    this.testimonialInterval = setInterval(() => this.nextTestimonial(), 5000);
  }

  nextTestimonial(): void {
    this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % this.testimonials.length;
  }

  prevTestimonial(): void {
    this.currentTestimonialIndex = (this.currentTestimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  private initScrollAnimations(): void {
    this.intersectionObserver = new IntersectionObserver((e) => {
      e.forEach(entry => {
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
    document.querySelectorAll('.animate-on-scroll').forEach(el => this.intersectionObserver?.observe(el));
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
