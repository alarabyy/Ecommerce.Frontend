import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  // يستقبل الرسالة التي ستُعرض، مثلاً "هل أنت متأكد؟"
  @Input() message: string = 'Are you sure you want to proceed?';

  // يرسل حدثًا بـ `true` عند تأكيد الإجراء، أو `false` عند الإلغاء
  @Output() confirmed = new EventEmitter<boolean>();

  onConfirm() {
    this.confirmed.emit(true);
  }

  onCancel() {
    this.confirmed.emit(false);
  }
}
