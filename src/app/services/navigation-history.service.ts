import { DestroyRef, Injectable, inject } from "@angular/core";
import { NavigationEnd, Router, RouterEvent } from "@angular/router";
import { BehaviorSubject, Observable, Subject, filter } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MainComponent } from "../pages/home/main/main.component";

@Injectable({providedIn: 'root'})
export class NavigationHistoryService{
    isHome$ = new BehaviorSubject<boolean>(null); 
    // as a simple Subject on intial load next method doesn't fire even though the currentPage()
    // fuunction is called. If I use a behaviorSubject it works. Maybe i'm missing something here
    // about Subjects.

    currentPage(event: RouterEvent): void{
        this.isHome$.next(event instanceof MainComponent);
    }
}