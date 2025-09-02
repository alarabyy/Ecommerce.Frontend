import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../Environments/environment';

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  categoryId?: number; // Add this for forms
  price?: number; // Optional properties for display
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  private serverStaticFilesUrl = 'https://ecommerce-nezamak.runasp.net';

  constructor(private http: HttpClient) { }

  private buildFullImageUrl(imageName: string | null): string {
    if (!imageName || imageName.startsWith('http')) {
      return imageName || 'https://via.placeholder.com/300';
    }
    // Assuming product images are stored at the root of a specific folder
    return `${this.serverStaticFilesUrl}/${imageName}`;
  }

  // GET /api/products (Public)
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map(products => products.map(p => ({ ...p, imageUrl: this.buildFullImageUrl(p.imageUrl) })))
    );
  }

  // GET /api/products/{id} (Public)
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      map(p => ({ ...p, imageUrl: this.buildFullImageUrl(p.imageUrl) }))
    );
  }

  // POST /api/products (Protected by Interceptor)
  addProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, formData);
  }

  // PUT /api/products/{id} (Protected by Interceptor)
  updateProduct(id: number, formData: FormData): Observable<any> {
    formData.append('id', id.toString());
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  // DELETE /api/products/{id} (Protected by Interceptor)
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // GET /api/products/search?name={name}
  searchProducts(name: string): Observable<Product[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Product[]>(`${this.apiUrl}/search`, { params }).pipe(
      map(products => products.map(p => ({ ...p, imageUrl: this.buildFullImageUrl(p.imageUrl) })))
    );
  }
}
