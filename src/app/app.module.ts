import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetStartedModule } from './pages/get-started/get-started.module';
import { HomeModule } from './pages/home/home.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GeneralInterceptor } from './interceptors/general.interceptor';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user/user.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user/user.effects';
import { playerReducer } from './state/player/player.reducers';
import { PlayerEffects } from './state/player/player.effects';
import { queueReducer } from './state/queue/queue.reducer';
import { QueueEffects } from './state/queue/queue.effects';
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
    HttpClientModule,
    StoreModule.forRoot({
      user: userReducer,
      player: playerReducer,
      queue: queueReducer,
    }),
    EffectsModule.forRoot([ UserEffects, PlayerEffects, QueueEffects]),
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: GeneralInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
