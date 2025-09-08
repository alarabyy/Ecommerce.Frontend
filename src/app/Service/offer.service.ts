import { Injectable } from '@angular/core';
import { environment } from '../Environments/environment'; // تأكد من المسار
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer, OfferItemPayload } from '../Models/Offer'; // تأكد من المسار

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  // Use a more generic base URL for the dashboard offers section
  private apiUrl = `${environment.apiUrl}/dashboard/offers`;

  constructor(private http: HttpClient) {}

  // POST /api/dashboard/offers/create
  addOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(`${this.apiUrl}/create`, offer);
  }

  // POST /api/dashboard/offers/item
  addOfferItem(itemPayload: OfferItemPayload): Observable<any> {
    // HttpClient will automatically set Content-Type to application/json
    return this.http.post<any>(`${this.apiUrl}/item`, itemPayload);
  }
  // --------------------------------------------------------

  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.apiUrl);
  }
}
