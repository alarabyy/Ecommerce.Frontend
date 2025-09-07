import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // --- *** هذا هو الشرط الصحيح والنهائي *** ---
  // A simple, robust, and future-proof condition:
  // If the API URL includes '/dashboard/', it's a protected route.
  const isDashboardApiUrl = req.url.includes('/dashboard/');

  if (token && isDashboardApiUrl) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // For debugging: This will confirm in the console that the token is being added.
    console.log('%c Interceptor: Adding Auth Header to ', 'background: #222; color: #bada55', req.url);
    return next(clonedReq);
  }

  // For all other public requests, pass them through without changes.
  return next(req);
};
