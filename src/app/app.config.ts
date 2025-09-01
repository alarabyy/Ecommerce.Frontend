import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Provides routing capabilities for the application
    provideRouter(routes),

    // 2. Enables client-side hydration for Server-Side Rendering (SSR)
    provideClientHydration(),

    // 3. Provides HttpClient and configures it to use the modern `fetch` API
    //    and automatically use our custom authInterceptor for outgoing requests.
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    )
  ]
};
