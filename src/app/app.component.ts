import { Component } from '@angular/core';
import { SidebarComponent } from "./Components/Widgets/sidebar/sidebar.component";
import { HomeComponent } from "./Components/Pages/home/home.component";
import { NavbarComponent } from "./Components/Widgets/navbar/navbar.component";
import { FooterComponent } from "./Components/Widgets/footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [SidebarComponent, HomeComponent, NavbarComponent, FooterComponent]
})
export class AppComponent {
  isSidebarOpen = true; // الشريط الجانبي مفتوح بشكل افتراضي على الشاشات الكبيرة

  constructor() {
    // إغلاق الشريط الجانبي تلقائيًا على الشاشات الصغيرة عند التحميل
    if (window.innerWidth < 992) {
      this.isSidebarOpen = false;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
