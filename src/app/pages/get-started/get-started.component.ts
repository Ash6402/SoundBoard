import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HttpAuthService } from '../../services/http/auth/http-auth.service';
import { Subscription } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton, MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatCard } from '@angular/material/card';

@Component({
    selector: 'app-get-started',
    templateUrl: './get-started.component.html',
    styleUrls: ['./get-started.component.scss'],
    standalone: true,
    imports: [MatCard, MatDivider, MatFabButton, MatIcon, MatButton]
})
export class GetStartedComponent implements OnInit, OnDestroy{

  getStarted: boolean = false;
  #http = inject(HttpAuthService);
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
