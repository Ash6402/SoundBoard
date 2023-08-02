import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NavigationHistoryService } from '../services/navigation-history.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatToolbarModule, MatButtonModule],
  template: `
        <mat-toolbar class="header">
            <div class="nav-btn-container">
                <button mat-mini-fab class="nav-btn" [disabled]="isHome$ | async"
                 (click)="back()"
                 ><mat-icon class="icon-color">keyboard_arrow_left</mat-icon></button>
                <button mat-mini-fab class="nav-btn"
                 (click)="next()"
                 ><mat-icon class="icon-color">keyboard_arrow_right</mat-icon></button>
            </div>
            <button mat-flat-button class="sign-out-btn">Sign Out</button>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isHome$ = inject(NavigationHistoryService).isHome$;
  private location = inject(Location);
  back(){
    this.location.back();
  }

  next(){
    this.location.forward();
  }
}
