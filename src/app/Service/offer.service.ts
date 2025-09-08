import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Offer, PaginatedOffers, OfferCreatePayload, OfferItemPayload, CreateOfferResponse } from '../Models/Offer';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = environment.apiUrl;
  private serverStaticFilesUrl = 'https://ecommerce-nezamak.runasp.net';

  constructor(private http: HttpClient) {}

  private buildFullImageUrl(imageName: string | null): string {
    if (!imageName || imageName.startsWith('http')) {
      return imageName || 'https://via.placeholder.com/400x225'; // Default placeholder
    }
    // Assuming offer images are stored in a specific path
    return `${this.serverStaticFilesUrl}/images/offers/${imageName}`;
  }

  // GET /api/offers (Public, paginated)
  getOffers(page: number = 1, itemsPerPage: number = 10): Observable<PaginatedOffers> {
    const params = new HttpParams()
      .set('Page', page.toString())
      .set('ItemsPerPage', itemsPerPage.toString());
    return this.http.get<PaginatedOffers>(`${this.apiUrl}/offers`, { params }).pipe(
        map(response => ({
            ...response,
            items: response.items.map(offer => ({
                ...offer,
                images: offer.images.map(img => this.buildFullImageUrl(img))
            }))
        }))
    );
  }

  // GET /api/offers/{id} (Public)
  getOfferById(id: number): Observable<Offer> {
    return this.http.get<{ data: Offer }>(`${this.apiUrl}/offers/${id}`).pipe(
      map(response => ({
        ...response.data,
        images: response.data.images.map(img => this.buildFullImageUrl(img))
      }))
    );
  }

  // POST /api/dashboard/offers/create
  addOffer(offer: OfferCreatePayload): Observable<CreateOfferResponse> {
    return this.http.post<CreateOfferResponse>(`${this.apiUrl}/dashboard/offers/create`, offer);
  }

  // POST /api/dashboard/offers/image
  uploadOfferImage(offerId: number, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('ImageFile', imageFile);
    const params = new HttpParams().set('OfferId', offerId.toString());
    return this.http.post(`${this.apiUrl}/dashboard/offers/image`, formData, { params });
  }

  // POST /api/dashboard/offers/item
  addOfferItem(itemPayload: OfferItemPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/dashboard/offers/item`, itemPayload);
  }
}
