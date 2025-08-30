import { Component, OnInit, HostListener } from '@angular/core';
import { ThemeService } from './Service/theme.service';
import { SidebarComponent } from "./Components/Widgets/sidebar/sidebar.component";
import { NavbarComponent } from "./Components/Widgets/navbar/navbar.component";
import { RouterOutlet } from "../../node_modules/@angular/router/router_module.d-Bx9ArA6K";
import { FooterComponent } from "./Components/Widgets/footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, FooterComponent]
})
export class AppComponent implements OnInit {
  isSidebarOpen = true;

  constructor(private themeService: ThemeService) {
    this.checkWindowSize(window.innerWidth);
  }

  ngOnInit() {
    this.themeService.initializeTheme();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize((event.target as Window).innerWidth);
  }

  private checkWindowSize(width: number) {
    if (width < 992 && this.isSidebarOpen) {
      this.isSidebarOpen = false;
    } else if (width >= 992 && !this.isSidebarOpen) {
      this.isSidebarOpen = true;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
