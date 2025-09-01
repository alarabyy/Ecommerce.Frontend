import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environments/environment.prod';

export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl; // <-- 2. استخدام متغير البيئة

  constructor(private http: HttpClient) { }

  // Public endpoint
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  // Dashboard endpoints (Interceptor will add token)
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/dashboard/categories/${id}`); // Assuming this is a dashboard route
  }

  addCategory(formData: FormData): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/dashboard/categories`, formData);
  }

  updateCategory(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/dashboard/categories/${id}`, formData);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/dashboard/categories/${id}`);
  }
}
