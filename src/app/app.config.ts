import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor'; // <-- 1. تأكد من استيراد الـ Interceptor

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),

    // ** 2. تأكد من أن هذا السطر موجود وصحيح **
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]) // تفعيل الـ Interceptor هنا
    )
  ]
};
