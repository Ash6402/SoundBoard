import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetStartedModule } from './get-started/get-started.module';
import { HomeModule } from './home/home.module';
import { WebPlayerModule } from './web-player/web-player.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GeneralInterceptor } from './interceptors/general.interceptor';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from './state/auth/auth.reducers';
import { userReducer } from './state/user/user.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth/auth.effects';
import { UserEffects } from './state/user/user.effects';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GetStartedModule,
    HomeModule,
    WebPlayerModule,
    HttpClientModule,
    StoreModule.forRoot({
      auth: AuthReducer,
      user: userReducer,
    }),
    EffectsModule.forRoot([AuthEffects, UserEffects]),
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: GeneralInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
