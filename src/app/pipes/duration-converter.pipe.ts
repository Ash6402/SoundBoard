import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationConverter'
})
export class DurationConverterPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown{
    const d = new Date(Date.UTC(0,0,0,0,0,0,value)),
  parts = [
    d.getUTCMinutes(),
    d.getUTCSeconds()
  ]
   return parts.map(s => String(s).padStart(2,'0')).join(':');
  }

}
