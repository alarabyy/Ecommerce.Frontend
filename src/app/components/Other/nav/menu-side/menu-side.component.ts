import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-side',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-side.component.html',
  styleUrls: ['./menu-side.component.css']
})
export class MenuSideComponent {
  isSidebarVisible = false;
  activeItem: string = 'Dashboard';

  menuItems = [
    { name: 'Dashboard', icon: 'fas fa-tachometer-alt', route: '/admin/dashboard' },
    { name: 'Products', icon: 'fas fa-boxes-stacked', route: '/admin/products' },
    { name: 'Inventory', icon: 'fas fa-warehouse', route: '/admin/inventory' },
    { name: 'Orders', icon: 'fas fa-file-invoice-dollar', route: '/admin/orders' },
    { name: 'Customers', icon: 'fas fa-users', route: '/admin/customers' },
    { name: 'Marketing', icon: 'fas fa-bullhorn', route: '/admin/marketing', badge: 'New' },
    { name: 'Analytics', icon: 'fas fa-chart-pie', route: '/admin/analytics' },
    { name: 'Settings', icon: 'fas fa-cogs', route: '/admin/settings' },
  ];

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  setActiveItem(itemName: string): void {
    this.activeItem = itemName;
    if (window.innerWidth < 768) {
      this.isSidebarVisible = false;
    }
  }
}
