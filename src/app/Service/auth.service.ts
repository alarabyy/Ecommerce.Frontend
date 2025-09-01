import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

// Define the shape of the login response
export interface AuthResponse {
  success: boolean;
  token: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://ecommerce-nezamak.runasp.net/api/auth';

  // BehaviorSubject to hold the current authentication state
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this._isAuthenticated.asObservable();

  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {
    // Check for token in localStorage on service initialization
    this.checkToken();
  }

  private checkToken() {
    const token = this.getToken();
    if (token) {
      // Here you might want to decode the token to check for expiration in a real app
      this._isAuthenticated.next(true);
    }
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.success && response.token) {
          this.storeToken(response.token);
          this._isAuthenticated.next(true);
        }
      })
    );
  }

  register(userInfo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userInfo);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this._isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  private storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
