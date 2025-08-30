import { Component, OnInit, HostListener } from '@angular/core';
import { ThemeService } from './Service/theme.service';
import { NavbarComponent } from './Components/Widgets/navbar/navbar.component';
import { FooterComponent } from './Components/Widgets/footer/footer.component';
import { SidebarComponent } from './Components/Widgets/sidebar/sidebar.component';
import { HomeComponent } from './Components/Pages/home/home.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [NavbarComponent , FooterComponent ,  SidebarComponent , RouterModule ]
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
    if (width < 992) {
      this.isSidebarOpen = false;
    } else {
      this.isSidebarOpen = true;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
