import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routing';
import { DatePipe } from '@angular/common';




// const INTERCEPTOR_PROVIDES = [{ provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true }];

// const PROVIDES_DESARROLLO: Provider[] = [
//   { provide: HTTP_INTERCEPTORS, useClass: HttpRequestMockInterceptorService, multi: true },
// ];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [
    provideAnimationsAsync(),
    // ...INTERCEPTOR_PROVIDES, 
    DatePipe, 
    // !environment.production ? PROVIDES_DESARROLLO : []
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
