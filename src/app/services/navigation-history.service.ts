import { Injectable } from "@angular/core";
import { RouterEvent } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { MainComponent } from "../pages/home/main/main.component";

@Injectable({providedIn: 'root'})
export class NavigationHistoryService{
    isHome$ = new BehaviorSubject<boolean>(null); 
    // as a simple Subject on intial load, next method doesn't fire even though the currentPage()
    // fuunction is called. If I use a behaviorSubject it works. Maybe i'm missing something here
    // about Subjects.

    currentPage(event: RouterEvent): void{
        this.isHome$.next(event instanceof MainComponent);
    }
}