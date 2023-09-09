import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "src/app/services/user.service";
import { getUser, getUserFailure, getUserSuccess } from "./user.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { User } from "src/app/models/user.model";
import { HttpAuthService } from "src/app/services/http/auth/http-auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class UserEffects{
   private userService = inject(UserService);
   private router = inject(Router);
   private httpService = inject(HttpAuthService);
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
        return this.userService.getUser()
            .pipe(map((user: User)=>
                getUserSuccess({user})
            )
        )
    }
}