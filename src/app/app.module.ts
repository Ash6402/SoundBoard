import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetStartedModule } from './get-started/get-started.module';
import { ServicesModule } from './services/services.module';
import { HomeModule } from './home/home.module';
import { WebPlayerModule } from './web-player/web-player.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GeneralInterceptor } from './interceptors/general.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GetStartedModule,
    ServicesModule,
    HomeModule,
    WebPlayerModule,
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: GeneralInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
