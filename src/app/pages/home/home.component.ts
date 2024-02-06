import { AfterViewInit, Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectError, selectUser } from '../../state/user/user.selectors';
import { getUser } from '../../state/user/user.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { NavigationHistoryService } from 'src/app/services/navigation-history.service';
import { initializePlayer } from 'src/app/state/player/player.actions';
import { RouterEvent, RouterOutlet } from '@angular/router';
import { WebPlayerComponent } from '../../web-player/web-player.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
    selector: 'app-home',
    template: `
    <app-header></app-header>
    <main class="main-section">
      <router-outlet (activate)="currentPage($event)"></router-outlet>
    </main> 
    <app-web-player></app-web-player>
  `,
    styleUrls: ['./home.component.scss'],
    providers: [NavigationHistoryService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        HeaderComponent,
        RouterOutlet,
        WebPlayerComponent,
    ],
})
export class HomeComponent implements OnInit, AfterViewInit{
  private store = inject(Store);
  navHistory = inject(NavigationHistoryService);
  user$ = this.store.select(selectUser);
  
  ngOnInit(): void {
    this.store.dispatch(getUser());
  }

  currentPage(event: RouterEvent){
    this.navHistory.currentPage(event);
  }

  ngAfterViewInit(){
    this.store.dispatch(initializePlayer())
  }

}
