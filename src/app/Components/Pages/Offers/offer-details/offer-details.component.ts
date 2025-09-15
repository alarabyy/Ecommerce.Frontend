import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap, of, map } from 'rxjs';
import { Offer } from '../../../../Models/Offer';
import { OfferService } from '../../../../Service/offer.service';

@Component({
  selector: 'app-offer-details',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit {
  offer$!: Observable<Offer | null>;
  selectedImage: string | null = null;
  totalPrice$: Observable<number>;

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService
  ) {
    // Initialize totalPrice$ to avoid template errors
    this.totalPrice$ = of(0);
  }

  ngOnInit(): void {
    this.offer$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.offerService.getOfferById(+id);
        }
        return of(null);
      })
    );

    // Initialize the image gallery and calculate total price
    this.offer$.subscribe(offer => {
      if (offer && offer.images.length > 0) {
        this.selectedImage = offer.images[0];
      }
    });

    // Calculate the total price of all items in the offer
    this.totalPrice$ = this.offer$.pipe(
      map(offer => {
        if (!offer || !offer.items) return 0;
        return offer.items.reduce((sum, item) => sum + item.price, 0);
      })
    );
  }

  selectImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/600x600';
  }
}
