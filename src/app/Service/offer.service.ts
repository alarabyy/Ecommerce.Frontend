import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  Offer,
  PaginatedOffers,
  CreateOfferResponse,
  OfferItemPayload
} from '../Models/Offer'; // تأكد من صحة المسار
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = environment.apiUrl;
  private serverStaticFilesUrl = 'https://ecommerce-nezamak.runasp.net';

  constructor(private http: HttpClient) {}

  // دالة مساعدة لبناء الرابط الكامل للصورة
  private buildFullImageUrl(imageName: string | null): string {
    if (!imageName || imageName.startsWith('http')) {
      return imageName || 'https://via.placeholder.com/400x225/f4f7fc/a0aec0?text=ProStore+Offer';
    }
    // مسار الصور بناءً على الـ Backend
    return `${this.serverStaticFilesUrl}/images/offers/${imageName}`;
  }

  // --- Public (Read) Operations ---

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

  // --- Dashboard (Write) Operations (Protected by Interceptor) ---

  /**
   * Creates a new offer shell with title, description, and items.
   * Images must be uploaded separately using uploadOfferImage.
   */
  addOffer(title: string, description: string, items: { ProductId: number; Price: number; Available: number }[]): Observable<CreateOfferResponse> {
    const params = new HttpParams()
      .set('Title', title)
      .set('Description', description)
      .set('Items', JSON.stringify(items)); // Items are sent as a JSON string in params

    // The body can be empty FormData if the API requires multipart, even without files.
    const formData = new FormData();

    return this.http.post<CreateOfferResponse>(`${this.apiUrl}/dashboard/offers/create`, formData, { params });
  }

  /**
   * Uploads an image for an existing offer.
   */
  uploadOfferImage(offerId: number, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('ImageFile', imageFile);

    const params = new HttpParams().set('OfferId', offerId.toString());

    return this.http.post(`${this.apiUrl}/dashboard/offers/image`, formData, { params });
  }

  /**
   * Adds a single product item to an existing offer.
   */
  addOfferItem(itemPayload: OfferItemPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/dashboard/offers/item`, itemPayload);
  }
}
