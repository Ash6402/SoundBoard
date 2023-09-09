import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { HomeComponent } from './home.component';
import { WebPlayerModule } from '../../web-player/web-player.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MainComponentModule } from './main/main.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from "../../header/header.component";

@NgModule({
    declarations: [
      HomeComponent,
    ],
    exports: [
      HomeComponent,
    ],
    imports: [
      CommonModule,
      RouterModule,
      MainComponentModule,
      MatCardModule,
      WebPlayerModule,
      MatSnackBarModule,
      MatButtonModule,
      MatIconModule,
      MatToolbarModule,
      HeaderComponent,
    ]
})
export class HomeModule { }
