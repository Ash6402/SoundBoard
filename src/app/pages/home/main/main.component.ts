import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpPlayerService } from 'src/app/services/http/player/http-player.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private httpService = inject(HttpPlayerService);
  navigate(param: string){
    this.router.navigate([param], {relativeTo: this.route});  
  }
  getPlaylists(){
    this.httpService.getAlbums();
  }
}
