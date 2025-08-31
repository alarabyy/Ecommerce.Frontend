import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../Models/category';
import { environment } from '../Environments/environment';
// Define the shape of a Category object

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl =  environment.apiUrl; // Base URL from environment

  // You must get this token from your login service in a real app
  private mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Replace with a valid token

  constructor(private http: HttpClient) { }

  // GET /api/categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  // GET /api/categories/{id}
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`);
  }

  // POST /api/dashboard/categories
  addCategory(name: string, description: string, image: File): Observable<Category> {
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Description', description);
    formData.append('Image', image);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.mockToken}`
    });

    return this.http.post<Category>(`${this.apiUrl}/dashboard/categories`, formData, { headers });
  }

  // PUT /api/dashboard/categories/{id} (Assuming this endpoint exists)
  updateCategory(id: number, name: string, description: string, image?: File): Observable<any> {
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Description', description);
    if (image) {
      formData.append('Image', image);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.mockToken}`
    });

    return this.http.put(`${this.apiUrl}/dashboard/categories/${id}`, formData, { headers });
  }

  // DELETE /api/dashboard/categories/{id} (Assuming this endpoint exists)
  deleteCategory(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.mockToken}`
    });

    return this.http.delete(`${this.apiUrl}/dashboard/categories/${id}`, { headers });
  }
}
