import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationConverter'
})
export class DurationConverterPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown{
    const d = new Date(Date.UTC(0,0,0,0,0,0,value)),
  // Pull out parts of interest
  parts = [
    d.getUTCMinutes(),
    d.getUTCSeconds()
  ]
  // Zero-pad
   return parts.map(s => String(s).padStart(2,'0')).join(':');
  }

}
