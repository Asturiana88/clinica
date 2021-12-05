import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatDynamicValue' })
export class DynamicValueFormatPipe implements PipeTransform {
  constructor() {}
  transform(value: { [key: string]: string }) {
    const key = Object.keys(value)[0];
    return `<strong>${key}</strong>: ${value[key]}`;
  }
}
