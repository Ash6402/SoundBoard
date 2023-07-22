import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  navigate(param: string){
    this.router.navigate([param], {relativeTo: this.route});
  }
}