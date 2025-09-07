import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.service';
import { environment } from '../Environments/environment';

// واجهة لشكل بيانات الماركة
export interface Brand {
  id: number;
  name: string;
  imageUrl: string;
  description?: string;
}

// واجهة لشكل بيانات الماركة مع منتجاتها
export interface BrandWithProducts {
  info: Brand;
  products: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseApiUrl = environment.apiUrl;
  // الرابط الأساسي الذي يتم فيه تخزين الصور على السيرفر
  private serverStaticFilesUrl = 'https://ecommerce-nezamak.runasp.net';

  constructor(private http: HttpClient) { }

  // دالة مساعدة لبناء الرابط الكامل للصورة
  private buildFullImageUrl(imageName: string | null): string {
    if (!imageName || imageName.startsWith('http')) {
      return imageName || 'https://via.placeholder.com/150';
    }
    // ** تم تصحيح المسار هنا من "brands" إلى "brand" **
    return `${this.serverStaticFilesUrl}/images/brand/${imageName}`;
  }

  // --- Public (Read) Operations ---

  // GET /api/brands
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.baseApiUrl}/brands`).pipe(
      map(brands => brands.map(b => ({ ...b, imageUrl: this.buildFullImageUrl(b.imageUrl) })))
    );
  }

  // GET /api/brands/{id}
  getBrandById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.baseApiUrl}/brands/${id}`).pipe(
      map(b => ({ ...b, imageUrl: this.buildFullImageUrl(b.imageUrl) }))
    );
  }

  // GET /api/brands/{id}/products
  getBrandWithProducts(id: number): Observable<BrandWithProducts> {
      return this.http.get<BrandWithProducts>(`${this.baseApiUrl}/brands/${id}/products`);
  }

  // --- Dashboard (Write) Operations (Protected by Interceptor) ---

  // POST /api/dashboard/brands
  addBrand(name: string, description: string, logo: File): Observable<any> {
    const formData = new FormData();
    formData.append('Logo', logo);
    const params = new HttpParams().set('Name', name).set('Description', description || '');
    return this.http.post(`${this.baseApiUrl}/dashboard/brands`, formData, { params });
  }

  // PUT /api/dashboard/brands
  updateBrand(id: number, name: string, description: string, image?: File): Observable<any> {
    const formData = new FormData();
    if (image) {
      formData.append('Image', image);
    }
    const params = new HttpParams().set('Id', id.toString()).set('Name', name).set('Description', description || '');
    return this.http.put(`${this.baseApiUrl}/dashboard/brands`, formData, { params });
  }

  // DELETE /api/dashboard/brands/{id}
  deleteBrand(id: number): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/dashboard/brands/${id}`);
  }
}
