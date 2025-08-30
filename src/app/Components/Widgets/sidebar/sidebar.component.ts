import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  // يستقبل حالة الفتح/الإغلاق من المكون الأب
  @Input() isOpen = false;
  // يرسل إشارة لإغلاق نفسه (مفيد عند النقر على الـ overlay)
  @Output() close = new EventEmitter<void>();

  closeSidebar() {
    this.close.emit();
  }
}
