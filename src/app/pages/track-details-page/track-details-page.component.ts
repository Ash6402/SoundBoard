import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Track } from 'src/app/models/track.model';

@Component({
  selector: 'app-track-details-page',
  standalone: true,
  imports: [],
  templateUrl: './track-details-page.component.html',
  styleUrl: './track-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackDetailsPageComponent implements OnInit {
  track = signal<Track>(null);
  
  ngOnInit(): void {

  }
}
