import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { GetStartedComponent } from './get-started.component';




@NgModule({
  declarations: [GetStartedComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,

  ],
  exports: [
    GetStartedComponent,
  ]

})
export class GetStartedModule { }
