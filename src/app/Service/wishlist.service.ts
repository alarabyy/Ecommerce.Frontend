import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../Environments/environment';
import { Offer } from '../Models/Offer';

export interface WishlistResponse {
  success: boolean;
  message: string | null;
  data: {
    items: Offer[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = `${environment.apiUrl}/wishlists`;

  // BehaviorSubject to keep the wishlist state updated across the app
  private _wishlistItems = new BehaviorSubject<Offer[]>([]);
  public wishlistItems$ = this._wishlistItems.asObservable();

  constructor(private http: HttpClient) {}

  // GET /api/wishlists/my-wishlist (Protected by Interceptor)
  getMyWishlist(): Observable<WishlistResponse> {
    return this.http.get<WishlistResponse>(`${this.apiUrl}/my-wishlist`).pipe(
      tap(response => {
        if (response.success && response.data?.items) {
          this._wishlistItems.next(response.data.items);
        }
      })
    );
  }

  // POST /api/wishlists/add (Protected by Interceptor)
  addToWishlist(offerId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { offerId }).pipe(
      tap(() => {
        // Refresh the wishlist after adding an item
        this.getMyWishlist().subscribe();
      })
    );
  }

  // DELETE /api/wishlists/delete (Protected by Interceptor)
  removeFromWishlist(id: number): Observable<any> {
    // The API expects the ID in the body
    const options = {
      body: { id }
    };
    return this.http.delete(`${this.apiUrl}/delete`, options).pipe(
      tap(() => {
        // Refresh the wishlist after removing an item
        this.getMyWishlist().subscribe();
      })
    );
  }
}
