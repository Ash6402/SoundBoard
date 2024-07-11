import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HttpAuthService } from '../../services/http/auth/http-auth.service';
import { Subscription } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton, MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatCard } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-get-started',
    templateUrl: './get-started.component.html',
    styleUrls: ['./get-started.component.scss'],
    standalone: true,
    imports: [AsyncPipe, MatCard, MatDivider, MatFabButton, MatIcon, MatButton]
})
export class GetStartedComponent {

  getStarted: boolean = false;
  #http = inject(HttpAuthService);
  authUrl = this.#http.login()
}
