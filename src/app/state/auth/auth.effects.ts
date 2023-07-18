import { Injectable, inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs';
import { getAccessToken, getTokenSuccess } from './auth.actions';
import { HttpAuthService } from 'src/app/services/http/auth/http-auth.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthEffects{
    private route = inject(ActivatedRoute);
    private actions$ = inject(Actions);
    private httpAuthService = inject(HttpAuthService);

    getToken$ = createEffect(() => 
        this.actions$.pipe(
            ofType(getAccessToken),
            switchMap(() =>
                this.httpAuthService.getAccessToken(this.route.snapshot.queryParams['code'])
                .pipe(map((response)=>{
                    localStorage.setItem('access_token', response.access_token);
                    localStorage.setItem('refresh_token', response.refresh_token);
                    localStorage.setItem('expiry', new Date().setSeconds(new Date().getSeconds() + response.expires_in).toString());
                    return getTokenSuccess()
                }))
            )
        )
    )
}

