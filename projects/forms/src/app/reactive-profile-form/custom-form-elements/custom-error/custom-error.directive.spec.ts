import { ElementRef } from '@angular/core';
import { CustomErrorDirective } from './custom-error.directive';

describe('CustomErrorDirective', () => {
  let el: ElementRef;
  it('should create an instance', () => {
    const directive = new CustomErrorDirective(el);
    expect(directive).toBeTruthy();
  });
});
