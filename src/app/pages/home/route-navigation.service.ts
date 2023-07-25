import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class RouteStorageService{
    previousRoute = new BehaviorSubject<string>(null);
    nextRoute = new BehaviorSubject<string>(null);
}