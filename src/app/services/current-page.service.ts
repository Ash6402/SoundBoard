import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class CurrentPageService {
  currentPage$ =  new BehaviorSubject<string>("Home");
}
