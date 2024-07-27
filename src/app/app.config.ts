import { isDevMode } from '@angular/core';
import { LikedSongsEffects } from './state/liked-songs/liked-songs.effects';
import { QueueEffects } from './state/queue/queue.effects';
import { PlayerEffects } from './state/player/player.effects';
import { UserEffects } from './state/user/user.effects';
import { provideEffects } from '@ngrx/effects';
import { likedSongsReducer } from './state/liked-songs/liked-songs.reducers';
import { queueReducer } from './state/queue/queue.reducer';
import { playerReducer } from './state/player/player.reducers';
import { userReducer } from './state/user/user.reducers';
import { provideState, provideStore } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { GeneralInterceptor } from './interceptors/general.interceptor';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { NavigationActionTiming, provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { ApplicationConfig } from "@angular/core";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(
            routes,
            withComponentInputBinding(),
            withViewTransitions(),
        ),

        // NGRX STORE SETUP
        provideStore(),
        provideState("router", routerReducer),
        provideState('user', userReducer),
        provideState('queue', queueReducer),
        provideState('player', playerReducer),
        provideState("likedSongs", likedSongsReducer),
        provideEffects(UserEffects, PlayerEffects, QueueEffects, LikedSongsEffects),

        // INTERCEPTORS
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
        provideHttpClient(withInterceptorsFromDi()),

        provideAnimations(),
        provideRouterStore({navigationActionTiming: NavigationActionTiming.PostActivation}),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
    ]
}