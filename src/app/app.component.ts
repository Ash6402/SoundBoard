import { Component, OnInit, inject } from '@angular/core';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SoundBoard';
  http = inject(HttpService);

  ngOnInit(): void {
    
  }
}
