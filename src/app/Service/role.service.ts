import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Role, UpdateRolePermissionsPayload } from '../Models/Role';
import { environment } from '../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = `${environment.apiUrl}/dashboard/role`;

  constructor(private http: HttpClient) { }

  // GET /api/dashboard/role
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl);
  }

  // POST /api/dashboard/role
  addRole(roleName: string): Observable<any> {
    return this.http.post(this.apiUrl, { roleName });
  }

  // DELETE /api/dashboard/role/{id}
  deleteRole(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // GET /api/dashboard/role/{id}/permissions
  getRolePermissions(id: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${id}/permissions`);
  }

  // PUT /api/dashboard/role/{id}/permissions
  updateRolePermissions(id: number, payload: UpdateRolePermissionsPayload): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/permissions`, payload);
  }

  // This is a mock function. In a real app, you should have a backend endpoint
  // that returns all possible permission strings available in the system.
  getAllPermissions(): Observable<string[]> {
      const mockPermissions = [
        "Permissions.Products.View", "Permissions.Products.Create", "Permissions.Products.Edit", "Permissions.Products.Delete",
        "Permissions.Brands.View", "Permissions.Brands.Create", "Permissions.Brands.Edit", "Permissions.Brands.Delete",
        "Permissions.Categories.View", "Permissions.Categories.Create", "Permissions.Categories.Edit", "Permissions.Categories.Delete",
        "Permissions.Offers.View", "Permissions.Offers.Create", "Permissions.Offers.Edit", "Permissions.Offers.Delete",
        "Permissions.Mails.View", "Permissions.Mails.Reply",
        "Permissions.Roles.View", "Permissions.Roles.Create", "Permissions.Roles.Edit", "Permissions.Roles.Delete"
      ];
      return of(this.groupPermissions(mockPermissions));
  }

  // Helper to group permissions by resource for better UI display
  private groupPermissions(permissions: string[]): string[] {
    return permissions.sort((a, b) => {
        const aGroup = a.split('.')[1];
        const bGroup = b.split('.')[1];
        if (aGroup === bGroup) {
            return a.split('.')[2].localeCompare(b.split('.')[2]);
        }
        return aGroup.localeCompare(bGroup);
    });
  }
}
