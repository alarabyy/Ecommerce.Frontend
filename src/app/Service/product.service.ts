import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment.prod';

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price?: number;
  category?: string;
  badge?: string | null;
  rating?: number;
  oldPrice?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`; // <-- 2. استخدام متغير البيئة

  constructor(private http: HttpClient) { }

  // GET /api/products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // GET /api/products/{id}
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // POST /api/products (Interceptor adds token)
  addProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, formData);
  }

  // PUT /api/products/{id} (Interceptor adds token)
  updateProduct(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  // DELETE /api/products/{id} (Interceptor adds token)
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // GET /api/products/search?name={name}
  searchProducts(name: string): Observable<Product[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Product[]>(`${this.apiUrl}/search`, { params });
  }
}
