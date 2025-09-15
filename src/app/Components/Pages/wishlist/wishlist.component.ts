import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Offer } from '../../../Models/Offer';
import { WishlistService } from '../../../Service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlistItems$!: Observable<Offer[]>;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    // Subscribe to the BehaviorSubject for live updates
    this.wishlistItems$ = this.wishlistService.wishlistItems$;
    // Fetch the initial list
    this.wishlistService.getMyWishlist().subscribe();
  }

  removeFromWishlist(event: MouseEvent, offerId: number) {
    event.preventDefault();
    event.stopPropagation();
    this.wishlistService.removeFromWishlist(offerId).subscribe();
  }

  getOfferImage(offer: Offer): string {
    return (offer.images && offer.images.length > 0)
      ? offer.images[0]
      : 'https://via.placeholder.com/400x225';
  }
}
