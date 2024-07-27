import { ChangeDetectionStrategy, Component, computed, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Artist } from 'src/app/models/artist.model';
import { SimplifiedArtist } from 'src/app/models/simplified-artist.model';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [RouterLink],
  template: `
    <p 
      class="link"
      [routerLink]="['/artist', _artist().id]"
      [class.bold]="this.bold()"
    >
      {{ _artist().name }}      
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  
  artist = input.required(
    {
      transform: (artist: Artist | SimplifiedArtist) => 
      ({  
        name: artist.name, 
        id: artist.id, 
        uri: artist.uri 
      })
    }
  )

  _artist = computed(() => 
    (!this.artist().id) ?
      {
        ...this.artist(),
        id: this.artist().uri.split(':')[2]
      }
      : this.artist()
  )

  bold = input<boolean>(false);
}

