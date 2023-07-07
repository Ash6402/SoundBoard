import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit, OnDestroy{

  getStarted: boolean = false;
  #http = inject(HttpService);
  authUrl: string;
  subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.#http.login().subscribe(
      (url)=>{
        this.authUrl = url;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
