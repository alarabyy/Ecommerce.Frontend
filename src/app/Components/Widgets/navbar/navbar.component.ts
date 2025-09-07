import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Theme, ThemeService } from '../../../Service/theme.service'; // تأكد من صحة المسار

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() sidebarToggle = new EventEmitter<void>();
  isScrolled = false;
  currentTheme: Theme;

  constructor(
    private themeService: ThemeService,
    private location: Location // خدمة Angular للتحكم في هيستوري المتصفح
  ) {
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  // تتبع التمرير لإضافة تأثيرات على الـ Navbar
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  // إرسال حدث لفتح/إغلاق الشريط الجانبي
  onToggleSidebar() {
    this.sidebarToggle.emit();
  }

  // تغيير الثيم (نهاري/ليلي/تلقائي)
  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
    this.currentTheme = theme;
  }

  // دالة للعودة إلى الصفحة السابقة
  goBack(): void {
    this.location.back();
  }

  // دالة للذهاب إلى الصفحة التالية (إذا كانت موجودة في الهيستوري)
  goForward(): void {
    this.location.forward();
  }
}
