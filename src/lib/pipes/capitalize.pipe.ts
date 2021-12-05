import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
  constructor() {}
  transform(value: string) {
    const [first, ...rest] = value;
    return [first.toUpperCase(), ...rest].join('');
  }
}
