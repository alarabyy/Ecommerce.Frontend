import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // هذا الـ EventEmitter سيرسل إشارة إلى المكون الأب (AppComponent)
  @Output() sidebarToggle = new EventEmitter<void>();

  onToggleSidebar() {
    this.sidebarToggle.emit();
  }
}
