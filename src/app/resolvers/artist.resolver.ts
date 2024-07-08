import { ResolveFn } from '@angular/router';
import { Artist } from '../models/artist.model';
import { HttpGeneralService } from '../services/http/general/http-general.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const artistResolver: ResolveFn<Observable<Artist>> = (route, state) => {
  const httpService = inject(HttpGeneralService);
  return httpService.getArtist(route.params?.id);
};
