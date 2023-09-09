import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out-dialog',
  standalone: true,
  template: `
    <div>
      <h1>
        Sign Out from Sound Board?
      </h1>
      <button mat-flat-button color="warn" (click)="signOut()" mat-dialog-close>Sign Out</button>
    </div>
  `,
  styleUrls: ['./sign-out-dialog.component.scss'],
  imports: [
    MatButtonModule,
    MatDialogModule,
  ]
})
export class SignOutDialogComponent {
  router = inject(Router);
  signOut(){
    this.router.navigate(['get-started']);
  }
}
