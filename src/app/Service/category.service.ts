import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../Environments/environment';

// ** 1. تم إضافة export هنا **
export interface Category {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseApiUrl = environment.apiUrl;
  private serverStaticFilesUrl = 'https://ecommerce-nezamak.runasp.net';

  constructor(private http: HttpClient) { }

  private buildFullImageUrl(imageName: string | null): string {
    if (!imageName || imageName.startsWith('http')) {
      return imageName || 'https://via.placeholder.com/150';
    }
    return `${this.serverStaticFilesUrl}/images/Category/${imageName}`;
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseApiUrl}/categories`).pipe(
      map(categories => categories.map(c => ({ ...c, imageUrl: this.buildFullImageUrl(c.imageUrl) })))
    );
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseApiUrl}/categories/${id}`).pipe(
      map(c => ({ ...c, imageUrl: this.buildFullImageUrl(c.imageUrl) }))
    );
  }

  // ** 2. تم تصحيح تعريف الدوال هنا **
  addCategory(name: string, description: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('Image', image);

    const params = new HttpParams()
      .set('Name', name)
      .set('Description', description || '');

    return this.http.post(`${this.baseApiUrl}/dashboard/categories`, formData, { params });
  }

  updateCategory(id: number, name: string, description: string, image?: File): Observable<any> {
    const formData = new FormData();
    if (image) {
      formData.append('Image', image);
    }

    const params = new HttpParams()
      .set('Name', name)
      .set('Description', description || '');

    return this.http.put(`${this.baseApiUrl}/dashboard/categories/${id}`, formData, { params });
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/dashboard/categories/${id}`);
  }
}
