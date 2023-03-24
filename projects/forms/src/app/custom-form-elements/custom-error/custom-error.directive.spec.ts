import { ElementRef } from '@angular/core';
import { TranslateService } from '../../translation/translate.service';
import { CustomErrorDirective } from './custom-error.directive';

describe('CustomErrorDirective', () => {
  let el: ElementRef;
  let translate: TranslateService = new TranslateService();
  it('should create an instance', () => {
    const directive = new CustomErrorDirective(el, translate);
    expect(directive).toBeTruthy();
  });
});
