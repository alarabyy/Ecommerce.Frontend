// app.config.ts

// 1. قم باستيراد هذه الوحدات
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- استيراد FormsModule
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http'; // <-- جيد إضافته للمستقبل

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    // 2. أضف هذا السطر لتوفير ميزات Forms و HttpClient للتطبيق بأكمله
    importProvidersFrom(FormsModule), // <-- هذا يجعل [(ngModel)] يعمل في كل مكان
    provideHttpClient(withFetch())   // <-- لإجراء طلبات API في المستقبل
  ]
};
