// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

// import { provideAnimations } from '@angular/platform-browser/animations';

// import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { TokenInterceptor } from './shared/services/token.interceptor';
// import { ProductService } from './shared/services/product.service';
// import { provideNzIcons } from 'ng-zorro-antd/icon';
// import { FileExcelOutline, SettingOutline, SearchOutline, ExportOutline, WechatOutline } from '@ant-design/icons-angular/icons';
// import { RateLimiterInterceptor } from './shared/services/rate-limiter.interceptor';




// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }),
//   provideRouter(routes),
//   provideClientHydration(withEventReplay()),
//   provideAnimations(),
//   provideHttpClient(withInterceptorsFromDi()), // Thêm withInterceptorsFromDi()
//     ProductService,
//   { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
//   provideNzIcons([FileExcelOutline, SettingOutline, SearchOutline, ExportOutline, WechatOutline]),
//   ],


// };


import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideAnimations } from '@angular/platform-browser/animations';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/services/token.interceptor';
import { ProductService } from './shared/services/product.service';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { FileExcelOutline, SettingOutline, SearchOutline, ExportOutline, WechatOutline } from '@ant-design/icons-angular/icons';
import { RateLimiterInterceptor } from './shared/services/rate-limiter.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    ProductService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RateLimiterInterceptor, multi: true },
    provideNzIcons([FileExcelOutline, SettingOutline, SearchOutline, ExportOutline, WechatOutline])
  ]
};