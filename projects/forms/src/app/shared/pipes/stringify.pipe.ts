import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringify',
  standalone: true,
})
export class StringifyPipe implements PipeTransform {
  transform(value: unknown): string {
    if (value) {
      return JSON.stringify(value);
    }
    return '';
  }
}
