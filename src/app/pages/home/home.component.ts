import { AfterViewInit, Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../state/user/user.selectors';
import { getUser } from '../../state/user/user.actions';
import { NavigationHistoryService } from 'src/app/services/navigation-history.service';
import { initializePlayer } from 'src/app/state/player/player.actions';
import { RouterEvent, RouterOutlet } from '@angular/router';
import { WebPlayerComponent } from '../../web-player/web-player.component';
import { HeaderComponent } from '../../header/header.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterEventsService } from 'src/app/services/router-events.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
    selector: 'app-home',
    template: `
    @if(isResolving() || isLoading()){
      <mat-progress-bar class="progress-bar secondary-progress-bar" mode="indeterminate"></mat-progress-bar>
    }
    <app-header class="header"></app-header>
    <main class="main-section">
      <router-outlet (activate)="currentPage($event)"></router-outlet>
    </main> 
    <app-web-player class="web-player"></app-web-player>
  `,
    styleUrls: ['./home.component.scss'],
    providers: [NavigationHistoryService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
      HeaderComponent,
      RouterOutlet,
      WebPlayerComponent,
      MatProgressBarModule,
    ],
})
export class HomeComponent implements OnInit, AfterViewInit{
  private store = inject(Store);
  navHistory = inject(NavigationHistoryService);
  user$ = this.store.select(selectUser);
  isResolving = inject(RouterEventsService).isResolving;
  isLoading = inject(LoaderService).loading;
  
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
