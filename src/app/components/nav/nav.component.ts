import { Component, Inject, OnInit, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  isMobileMenuOpen = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // تحقق من localStorage أو تفضيلات النظام للثيم المظلم
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkMode = savedTheme === 'dark';
      } else {
        this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      if (this.isDarkMode) {
        this.document.body.classList.add('dark-mode');
      }
    }
  }

  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        this.document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        this.document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (isPlatformBrowser(this.platformId)) {
      // إضافة/إزالة كلاس من body للتحكم بالصفحة كلها
      this.document.body.classList.toggle('mobile-menu-active', this.isMobileMenuOpen);
    }
  }

  // دالة لتنظيف الكلاس عند تدمير المكون (ممارسة جيدة)
  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
        this.document.body.classList.remove('mobile-menu-active');
    }
  }
}
