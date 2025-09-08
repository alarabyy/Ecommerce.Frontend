import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OfferService } from '../../../../Service/offer.service';
import { Offer } from '../../../../Models/Offer';

@Component({
  selector: 'app-all-offer', // <-- اسم المكون
  standalone: true,
  imports: [CommonModule, RouterModule],
  // --- *** هذا هو الإصلاح الحاسم *** ---
  templateUrl: './all-offer.component.html', // <-- إزالة الـ 's'
  styleUrls: ['./all-offer.component.scss']  // <-- إزالة الـ 's'
  // ------------------------------------
})
export class AllOfferComponent implements OnInit { // <-- اسم الكلاس
  offers$!: Observable<Offer[]>;

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.offers$ = this.offerService.getOffers().pipe(
      map(response => response.items)
    );
  }

  getOfferImage(offer: Offer): string {
    return 'https://i.imgur.com/8QpJa7k.png';
  }
}
