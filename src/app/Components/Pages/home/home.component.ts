import { Component, AfterViewInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WelcomePopupComponent } from "../../Widgets/welcome-popup/welcome-popup.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, WelcomePopupComponent],
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  features = [
    { icon: 'fas fa-shipping-fast', title: 'Lightning-Fast Delivery', description: 'Get your orders delivered at the speed of light, right to your doorstep.' },
    { icon: 'fas fa-shield-alt', title: 'Fort-Knox Security', description: 'We protect every transaction with advanced encryption and secure protocols.' },
    { icon: 'fas fa-headset', title: '24/7 Legendary Support', description: 'Dedicated support available around the clock to help you.' },
    { icon: 'fas fa-undo-alt', title: 'Effortless Returns', description: '30-day returns — simple and straightforward.' },
    { icon: 'fas fa-tags', title: 'Curated Selection', description: 'We handpick every product to meet high-quality standards.' },
    { icon: 'fas fa-thumbs-up', title: 'Verified Reviews', description: 'Authentic customer feedback to help you choose confidently.' }
  ];

  testimonials = [
    { quote: 'The future of e-commerce is here. Blazing fast, beautiful, and the support is unreal!', author: 'Sarah J.', role: 'Tech Enthusiast' },
    { quote: 'I never thought online shopping could be this seamless. ProStore has set a new standard.', author: 'Michael B.', role: 'First-time Buyer' },
    { quote: 'An absolutely stunning selection and a user experience that is second to none. I am a customer for life!', author: 'Emily K.', role: 'Gadget Lover' },
    { quote: 'Fast delivery and great packaging. The product matched the description perfectly.', author: 'Omar A.', role: 'Designer' },
    { quote: 'Support helped me quickly with an exchange — very professional.', author: 'Nada R.', role: 'Photographer' }
  ];

  private observer?: IntersectionObserver;
  private carouselInterval: any = null;
  private carouselPaused = false;
  private carouselEl?: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // 1. Staggered hero entrance animations
    setTimeout(() => {
      const title = this.el.nativeElement.querySelector('#heroTitle');
      const subtitle = this.el.nativeElement.querySelector('#heroSubtitle');
      const actions = this.el.nativeElement.querySelector('#heroActions');

      if (title) this.renderer.addClass(title, 'entered');
      if (subtitle) this.renderer.addClass(subtitle, 'entered');
      if (actions) this.renderer.addClass(actions, 'entered');
    }, 200);

    // 2. IntersectionObserver for scroll animations
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'visible');
        }
      });
    }, { threshold: 0.15 });

    const sections = this.el.nativeElement.querySelectorAll('.home-section');
    sections.forEach((s: Element) => this.observer!.observe(s));

    // 3. Testimonials auto-scroll carousel
    this.carouselEl = this.el.nativeElement.querySelector('#testiCarousel');
    if (this.carouselEl) {
      this.startCarousel();
    }

    // 4. Parallax effect for floating icons
    const hero = this.el.nativeElement.querySelector('.hero-section');
    if (hero) {
      hero.addEventListener('mousemove', this.handleParallax);
      hero.addEventListener('mouseleave', this.resetParallax);
    }
  }

  startCarousel() {
    this.carouselInterval = setInterval(() => {
      if (this.carouselPaused || !this.carouselEl) return;
      const child = this.carouselEl.querySelector('.testimonial-card');
      if (!child) return;

      const cardWidth = (child as HTMLElement).offsetWidth + 16; // 16 is the gap
      this.carouselEl.scrollBy({ left: cardWidth, behavior: 'smooth' });

      // Reset to start if near the end
      const maxScroll = this.carouselEl.scrollWidth - this.carouselEl.clientWidth;
      if (this.carouselEl.scrollLeft >= maxScroll - 5) {
        setTimeout(() => {
          if (this.carouselEl) this.carouselEl.scrollTo({ left: 0, behavior: 'smooth' });
        }, 700);
      }
    }, 4000);
  }

  pauseCarousel() { this.carouselPaused = true; }
  resumeCarousel() { this.carouselPaused = false; }

  subscribe(e: Event) {
    e.preventDefault();
    alert('Thank you for subscribing!');
  }

  handleParallax = (evt: MouseEvent) => {
    const icons = this.el.nativeElement.querySelectorAll('.floating-icons .icon');
    if (!icons) return;
    const rect = (evt.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (evt.clientX - centerX) / rect.width;
    const offsetY = (evt.clientY - centerY) / rect.height;

    icons.forEach((ic: HTMLElement, idx: number) => {
      const depth = (idx + 1) * 8;
      const tx = offsetX * depth * -1; // Invert for natural feel
      const ty = offsetY * depth * -1;
      this.renderer.setStyle(ic, 'transform', `translate3d(${tx}px, ${ty}px, 0)`);
    });
  }

  resetParallax = () => {
    const icons = this.el.nativeElement.querySelectorAll('.floating-icons .icon');
    icons.forEach((ic: HTMLElement) => {
      this.renderer.setStyle(ic, 'transform', '');
    });
  }

  ngOnDestroy(): void {
    if (this.observer) this.observer.disconnect();
    if (this.carouselInterval) clearInterval(this.carouselInterval);
    const hero = this.el.nativeElement.querySelector('.hero-section');
    if (hero) {
      hero.removeEventListener('mousemove', this.handleParallax);
      hero.removeEventListener('mouseleave', this.resetParallax);
    }
  }
}
