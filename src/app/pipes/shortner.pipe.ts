import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortner',
  standalone: true,
})
export class ShortnerPipe implements PipeTransform {

  transform(value: string, length: number): unknown {
    if(value.length > length)
      return value.slice(0, length-1).concat("...")
    else 
      return value
  }

}
