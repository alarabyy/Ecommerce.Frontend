import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeKey = 'isDarkMode'; // مفتاح لتخزين تفضيل المستخدم

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    // قم بتحميل الثيم عند بدء تشغيل الخدمة
    this.loadTheme();
  }

  // تحميل الثيم المحفوظ من localStorage
  private loadTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem(this.darkModeKey);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      // إذا كان هناك تفضيل محفوظ، استخدمه. وإلا، استخدم تفضيل النظام.
      const isDark = storedTheme === 'true' || (storedTheme === null && prefersDark);

      if (isDark) {
        this.document.body.classList.add('dark-mode');
      } else {
        this.document.body.classList.remove('dark-mode');
      }
    }
  }

  // تبديل الثيم
  toggleTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isDark = this.document.body.classList.toggle('dark-mode');
      localStorage.setItem(this.darkModeKey, isDark.toString());
    }
  }

  // التحقق من الثيم الحالي
  isDarkMode(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return this.document.body.classList.contains('dark-mode');
    }
    return false; // القيمة الافتراضية للبيئة غير المتصفح
  }
}
