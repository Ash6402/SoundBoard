import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { LikedSongsEffects } from './app/state/liked-songs/liked-songs.effects';
import { QueueEffects } from './app/state/queue/queue.effects';
import { PlayerEffects } from './app/state/player/player.effects';
import { UserEffects } from './app/state/user/user.effects';
import { EffectsModule } from '@ngrx/effects';
import { likedSongsReducer } from './app/state/liked-songs/liked-songs.reducers';
import { queueReducer } from './app/state/queue/queue.reducer';
import { playerReducer } from './app/state/player/player.reducers';
import { userReducer } from './app/state/user/user.reducers';
import { StoreModule } from '@ngrx/store';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ErrorHandlerInterceptor } from './app/interceptors/error-handler.interceptor';
import { GeneralInterceptor } from './app/interceptors/general.interceptor';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        importProvidersFrom(BrowserModule, MatDialogModule, StoreModule.forRoot({
            user: userReducer,
            player: playerReducer,
            queue: queueReducer,
            likedSongs: likedSongsReducer,
        }), EffectsModule.forRoot([UserEffects, PlayerEffects, QueueEffects, LikedSongsEffects])),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GeneralInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
        },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
