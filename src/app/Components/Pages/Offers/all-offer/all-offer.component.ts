import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { Offer } from '../../../../Models/Offer';
import { OfferService } from '../../../../Service/offer.service';
import { WishlistService } from '../../../../Service/wishlist.service';

@Component({
  selector: 'app-all-offers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-offer.component.html',
  styleUrls: ['./all-offer.component.scss']
})
export class AllOffersComponent implements OnInit, OnDestroy {
  offers$!: Observable<Offer[]>;
  wishlistItems: Offer[] = []; // قائمة لتخزين عناصر قائمة الرغبات
  private wishlistSub!: Subscription;

  constructor(
    private offerService: OfferService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    // جلب كل العروض
    this.offers$ = this.offerService.getOffers().pipe(
      map(response => response.items) // استخلاص مصفوفة العروض من الرد
    );

    // الاشتراك في قائمة الرغبات للحصول على التحديثات الفورية
    this.wishlistSub = this.wishlistService.wishlistItems$.subscribe(items => {
      this.wishlistItems = items;
    });

    // جلب القائمة الأولية عند تحميل المكون
    this.wishlistService.getMyWishlist().subscribe();
  }

  // دالة مؤقتة لعرض صورة العرض
  getOfferImage(offer: Offer): string {
    return (offer.images && offer.images.length > 0)
      ? offer.images[0]
      : 'https://via.placeholder.com/400x225/f4f7fc/a0aec0?text=ProStore+Offer';
  }

  // دالة لإضافة أو إزالة عرض من قائمة الرغبات
  toggleWishlist(event: MouseEvent, offer: Offer) {
    event.preventDefault(); // منع الانتقال إلى صفحة التفاصيل عند النقر على القلب
    event.stopPropagation(); // منع أي أحداث أخرى من الحدوث

    if (this.isInWishlist(offer.id)) {
      this.wishlistService.removeFromWishlist(offer.id).subscribe();
    } else {
      this.wishlistService.addToWishlist(offer.id).subscribe();
    }
  }

  // دالة للتحقق مما إذا كان العرض موجودًا في قائمة الرغبات
  isInWishlist(offerId: number): boolean {
    return this.wishlistItems.some(item => item.id === offerId);
  }

  ngOnDestroy(): void {
    // إلغاء الاشتراك دائمًا لتجنب تسرب الذاكرة
    if (this.wishlistSub) {
      this.wishlistSub.unsubscribe();
    }
  }
}
