import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { TrackItemComponent } from './shared/track-item/track-item.component';
import { PagesModule } from './pages/pages.module';
import { WebPlayerModule } from "./web-player/web-player.module";
import { HeaderComponent } from "./header/header.component";
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { SignOutDialogComponent } from './sign-out-dialog/sign-out-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: GeneralInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
        }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        TrackItemComponent,
        BrowserAnimationsModule,
        HeaderComponent,
        SignOutDialogComponent,
        PagesModule,
        WebPlayerModule,
        HttpClientModule,
        MatDialogModule,
        StoreModule.forRoot({
            user: userReducer,
            player: playerReducer,
            queue: queueReducer,
        }),
        EffectsModule.forRoot([UserEffects, PlayerEffects, QueueEffects]),

    ]
})
export class AppModule { }
