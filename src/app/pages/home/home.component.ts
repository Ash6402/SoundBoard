import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectError, selectUser } from '../../state/user/user.selectors';
import { getUser } from '../../state/user/user.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  private store = inject(Store);
  snackbar = inject(MatSnackBar);
  user$ = this.store.select(selectUser);
  error$ = this.store.select(selectError).pipe(
    tap((err)=>{
      if(err)
        console.log(err);
        this.snackbar.open('An Unexpected Error Occured',null, {duration: 3000});
    })
  )

  ngOnInit(): void {
    this.store.dispatch(getUser());
  }

}
