import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "src/app/services/user.service";
import { getUser, getUserSuccess } from "./user.actions";
import { map, switchMap } from "rxjs";
import { User } from "src/app/models/user.model";

@Injectable()
export class UserEffects{
   private userService = inject(UserService);
   private actions$ = inject(Actions);
   getUser$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getUser),
        switchMap(()=> this.userService.getUser()
                .pipe(map((user: User) => 
                    getUserSuccess({user})
                ))                               
            )
        ))    
}