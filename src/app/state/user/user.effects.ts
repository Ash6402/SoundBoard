import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { follow, getUser, getUserFailure, getUserSuccess, signOut, unfollow } from "./user.actions";
import { EMPTY, catchError, map, of, switchMap } from "rxjs";
import { User } from "src/app/models/user.model";
import { HttpAuthService } from "src/app/services/http/auth/http-auth.service";
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { HttpGeneralService } from "src/app/services/http/general/http-general.service";

@Injectable()
export class UserEffects{
   private httpService = inject(HttpAuthService);
   private httpGeneralService = inject(HttpGeneralService);

   private route = inject(ActivatedRoute);
   private actions$ = inject(Actions);

   getUser$ = createEffect(()=>
        this.actions$.pipe(
            ofType(getUser),
            switchMap(()=> {
                if(!localStorage.getItem('access_token'))
                    return this.GetTokenAndUser;
                return this.getUser;
            }),
            catchError((err: HttpErrorResponse) => {
                console.log(err);
                return of(getUserFailure({error: err.message}))}
            )
        )
    )

    follow$ = createEffect(() => 
        this.actions$.pipe(
            ofType(follow),
            switchMap(({id, typeOf}) => this.httpGeneralService.follow(id, typeOf)),
        ), {dispatch: false}
    )

    unfollow$ = createEffect(() => 
        this.actions$.pipe(
            ofType(unfollow),
            switchMap(({id, typeOf}) => this.httpGeneralService.unfollow(id, typeOf))
        )
        ,{dispatch: false}
    )

    
    signOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signOut),
            switchMap(() => this.clearLocalStorage())
        ), {dispatch: false})
    
    private get GetTokenAndUser(){
        return this.httpService.getAccessToken(this.route.snapshot.queryParams['code'])
        .pipe(map((response)=>{
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('refresh_token', response.refresh_token);
                localStorage.setItem('expiry', new Date().setSeconds(new Date().getSeconds() + response.expires_in).toString());
            }),
            switchMap(()=> this.getUser),
        )
    }

    private get getUser(){
        return this.httpService.getUser()
            .pipe(map((user: User)=>
                getUserSuccess({user})
            )
        )
    }

    clearLocalStorage(){
        localStorage.clear()
        return EMPTY
    }
}