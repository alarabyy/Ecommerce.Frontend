import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../Widgets/footer/footer.component';
import { NavbarComponent } from '../../Widgets/navbar/navbar.component';
import { SidebarComponent } from '../../Widgets/sidebar/sidebar.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent, SidebarComponent],
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent {
  isSidebarOpen = false; // أو أي قيمة ابتدائية تريدها

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
