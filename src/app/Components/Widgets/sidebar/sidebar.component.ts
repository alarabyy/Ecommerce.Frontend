import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../Service/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  isAuthenticated$!: Observable<boolean>; // <-- 2. تعريف متغير جديد

  constructor(private authService: AuthService) {} // <-- 3. حقن الخدمة

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  closeSidebar() {
    this.close.emit();
  }

  logout() {
    this.authService.logout();
    this.closeSidebar(); // إغلاق الشريط الجانبي بعد الخروج
  }
}
