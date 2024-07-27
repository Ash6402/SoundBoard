import { Component } from '@angular/core';

@Component({
  selector: 'app-track-placeholder',
  standalone: true,
  imports: [],
  template: `
    <div class='track-item placeholder'>
      <img src="/assets/placeholder.png" alt="placeholder image">
    </div>
  `,
  styles: `
    .track-item{
      padding: 0;
      height: 56px;
      border-radius: 3px;

      img{
        margin-left: 1.5rem;
        width: 3.5rem;
        border-radius: 3px;
      }
    }
  `
})
export class TrackPlaceholderComponent {

}
