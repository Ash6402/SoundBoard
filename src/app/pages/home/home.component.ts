import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectError, selectUser } from '../../state/user/user.selectors';
import { getUser } from '../../state/user/user.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { Location } from '@angular/common';
import { NavigationHistoryService } from 'src/app/services/navigation-history.service';
import { initializePlayer } from 'src/app/state/player/player.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NavigationHistoryService],
})
export class HomeComponent implements OnInit, AfterViewInit{
  private store = inject(Store);
  snackbar = inject(MatSnackBar);
  location = inject(Location);
  navHistory = inject(NavigationHistoryService);
  user$ = this.store.select(selectUser);
  error$ = this.store.select(selectError).pipe(
    tap((err)=>{
      if(err)
        console.log(err);
        this.snackbar.open('An Unexpected Error Occured', null, {duration: 3000});
    })
  )
  
  back(){
    this.location.back();
  }

  next(){
    this.location.forward();
  }
  
  ngOnInit(): void {
    this.store.dispatch(getUser());
    this.navHistory.NavHistory();
  }

  ngAfterViewInit(){
    this.store.dispatch(initializePlayer())
  }

}
