import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../Service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Define protected URL segments
  const protectedSegments = ['/dashboard/categories', '/dashboard/products', '/dashboard/brands'];

  // Check if the URL is for a protected resource
  const isProtectedAction = protectedSegments.some(segment => req.url.includes(segment));

  if (token && isProtectedAction) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  return next(req);
};
