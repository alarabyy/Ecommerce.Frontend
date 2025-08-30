import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Theme, ThemeService } from '../../../Service/theme.service';

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

  constructor(private themeService: ThemeService) { // Assuming you have this service
    this.currentTheme = this.themeService.getCurrentTheme();
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
}
