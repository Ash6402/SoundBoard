import { Injectable, inject } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

@Injectable()
export class NavigationHistoryService{
    private router = inject(Router);

    NavHistory(){
        this.router.events.pipe(
            filter((e)=> e instanceof NavigationEnd))
            .subscribe((e: NavigationEnd)=> console.log(e.url));
    }
}