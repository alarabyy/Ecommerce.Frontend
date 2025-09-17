import { Component, EventEmitter, Output, HostListener, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Theme, ThemeService } from '../../../Service/theme.service';
import { AuthService } from '../../../Service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter<void>();
  isScrolled = false;
  currentTheme: Theme;
  isAuthenticated$!: Observable<boolean>;
  isMobileMenuOpen = false; // ✅ حالة فتح/غلق السايد بار

  constructor(
    private themeService: ThemeService,
    private location: Location,
    private authService: AuthService
  ) {
    this.currentTheme = this.themeService.getCurrentTheme();
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  onToggleSidebar() {
    this.sidebarToggle.emit();
  }

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
    this.currentTheme = theme;
  }

  goBack(): void {
    this.location.back();
  }

  goForward(): void {
    this.location.forward();
  }

  toggleMobileMenu() { // ✅ فتح/غلق السايد بار
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() { // ✅ قفل السايد بار عند الضغط على لينك
    this.isMobileMenuOpen = false;
  }
}
