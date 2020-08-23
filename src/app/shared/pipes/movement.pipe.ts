import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movement'
})
export class MovementPipe implements PipeTransform {

  constructor() {}

  transform(value: string): string {
    if (!value) {
      return '';
    }

    return value.replace('-', ' ');
  }

}
