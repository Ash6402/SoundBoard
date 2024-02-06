import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NavigationHistoryService } from '../services/navigation-history.service';
import { CurrentPageService } from '../services/current-page.service';
import { MatDialog } from '@angular/material/dialog';
import { SignOutDialogComponent } from '../sign-out-dialog/sign-out-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatMenuModule,
    MatIconModule,
  ],
  template: `
    <mat-toolbar class="header">
        <div class="nav-btn-container">
            <button mat-mini-fab class="nav-btn" [disabled]="isHome$ | async"
              (click)="back()"
              ><mat-icon class="icon-color nav-icon">keyboard_arrow_left</mat-icon></button>
            <button mat-mini-fab class="nav-btn"
              (click)="next()"
              ><mat-icon class="icon-color nav-icon">keyboard_arrow_right</mat-icon></button>
            <p>{{ currentPage$ | async }}</p>
        </div>
        <div class="btns" *ngIf="!(isMobile$| async).matches else menuTemplate">
          <button mat-icon-button color="accent" (click)="navigateToSearch()">
            <mat-icon>search</mat-icon>
          </button>
          <button
          mat-flat-button class="sign-out-btn"
          (click)="signOutDialog()">Sign Out</button>
        </div>
        <ng-template #menuTemplate>
          <button class="icon-btn" [matMenuTriggerFor]="menu" mat-icon-button>
            <mat-icon>more_vert</mat-icon>
          </button>
        </ng-template>
        <mat-menu #menu>
          <div class="mobile-menu">
            <button mat-icon-button (click)="navigateToSearch()" color="accent">
              <mat-icon>search</mat-icon>
            </button>
            <a class="sign-out"
            (click)="signOutDialog()">Sign Out</a>
          </div>
        </mat-menu>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  router = inject(Router);
  isHome$ = inject(NavigationHistoryService).isHome$;
  currentPage$  = inject(CurrentPageService).currentPage$;
  isMobile$ = inject(BreakpointObserver).observe(Breakpoints.XSmall);
  dialogRef = inject(MatDialog); 
  private location = inject(Location);

  back(){
    this.location.back();
  }

  next(){
    this.location.forward();
  }

  navigateToSearch(){
    this.router.navigate(['/search']);
  }

  signOutDialog(){
    this.dialogRef.open(SignOutDialogComponent);
  }
}
