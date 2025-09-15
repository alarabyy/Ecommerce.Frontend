import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-popup',
  templateUrl: 'welcome-popup.component.html',
  styleUrls: ['./welcome-popup.component.scss'],
  imports: [CommonModule]
})
export class WelcomePopupComponent implements OnInit {
  isOpen: boolean = false;

  ngOnInit(): void {
    // يظهر أول مرة بس
    if (!localStorage.getItem('visited')) {
      setTimeout(() => {
        this.isOpen = true;
        localStorage.setItem('visited', 'true');
      }, 1000); // تأخير بسيط عشان التأثير
    }
  }

  closePopup() {
    this.isOpen = false;
  }

  claimOffer() {
    this.isOpen = false;
    // تحويل لصفحة التسجيل
    window.location.href = '/signup';
  }
}
