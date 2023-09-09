import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { HttpPlayerService } from 'src/app/services/http/player/http-player.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private httpService = inject(HttpPlayerService);
  currentPageService = inject(CurrentPageService);

  ngOnInit(): void {
    this.currentPageService.currentPage$.next("Home");
  }

  navigate(param: string){
    this.router.navigate([param], {relativeTo: this.route});  
  }
  getPlaylists(){
    this.httpService.getAlbums();
  }
}
