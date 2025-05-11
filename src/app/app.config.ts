import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/services/token.interceptor';
import { ProductService } from './shared/services/product.service';



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(withEventReplay()),
  provideAnimations(),
  provideHttpClient(withInterceptorsFromDi()), // Thêm withInterceptorsFromDi()
    ProductService,
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],

};
