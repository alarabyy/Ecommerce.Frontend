import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id: number; name: string; description: string;
  imageUrl: string; createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = 'https://ecommerce-nezamak.runasp.net/api';

  constructor(private http: HttpClient) { }

  // Public endpoints - no token needed
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`);
  }

  // Dashboard endpoints - Interceptor will add the token automatically
  addCategory(name: string, description: string, image: File): Observable<Category> {
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Description', description);
    formData.append('Image', image);
    return this.http.post<Category>(`${this.apiUrl}/dashboard/categories`, formData);
  }

  updateCategory(id: number, name: string, description: string, image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Description', description);
    if (image) {
      formData.append('Image', image);
    }
    return this.http.put(`${this.apiUrl}/dashboard/categories/${id}`, formData);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/dashboard/categories/${id}`);
  }
}
