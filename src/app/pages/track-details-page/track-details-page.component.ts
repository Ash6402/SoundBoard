import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track-details-page',
  standalone: true,
  imports: [],
  templateUrl: './track-details-page.component.html',
  styleUrl: './track-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackDetailsPageComponent implements OnInit {
  route = inject(ActivatedRoute);
  ngOnInit(): void {
    console.log(this.route.snapshot.queryParamMap.get('id'))
  }

}
