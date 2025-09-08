import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../Environments/environment';

// Login step enum
export enum LoginStep {
  Password = 0,
  Otp = 1,
  EmailConfirmation = 2,
  LoginSuccess = 3,
  Invalid = 4
}

// Login session response interface
export interface LoginSessionResponse {
  sessionId: string;
  nextStep: LoginStep;
  message?: string;
}

// Password validation response interface
export interface PasswordValidationResponse {
  sessionId: string;
  nextStep: LoginStep;
  token?: string;
  message?: string;
}

// OTP validation response interface
export interface OtpValidationResponse {
  sessionId: string;
  nextStep: LoginStep;
  token?: string;
  message?: string;
}

// Legacy interface for backward compatibility
export interface AuthResponse {
  success: boolean;
  token: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private sessionIdKey = 'login_session_id';

  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this._isAuthenticated.asObservable();
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  private checkToken() {
    const token = this.getToken();
    if (token) {
      this._isAuthenticated.next(true);
    }
  }

  // Multi-step authentication methods
  startLoginSession(email: string): Observable<LoginSessionResponse> {
    return this.http.post<LoginSessionResponse>(`${this.apiUrl}/login/start-session`, { email });
  }

  validatePassword(sessionId: string, password: string): Observable<PasswordValidationResponse> {
    return this.http.post<PasswordValidationResponse>(`${this.apiUrl}/login/validate-password`, {
      sessionId,
      password
    });
  }

  validateOtp(sessionId: string, otpCode: string): Observable<OtpValidationResponse> {
    return this.http.post<OtpValidationResponse>(`${this.apiUrl}/login/validate-otp`, {
      sessionId,
      otpCode
    });
  }

  resendOtp(sessionId: string): Observable<{ message?: string }> {
    return this.http.post<{ message?: string }>(`${this.apiUrl}/login/resend-otp`, {
      sessionId
    });
  }

  // Session management
  storeSessionId(sessionId: string): void {
    localStorage.setItem(this.sessionIdKey, sessionId);
  }

  getSessionId(): string | null {
    return localStorage.getItem(this.sessionIdKey);
  }

  clearSessionId(): void {
    localStorage.removeItem(this.sessionIdKey);
  }

  // Legacy login method (for backward compatibility)
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

  confirmEmail(userId: string, token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm-email`, { userId, token });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.clearSessionId();
    this._isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  private storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }


  // لو عايز تتحقق هل المستخدم لسه مسجل دخول
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
