import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appCustomError]',
  standalone: true,
})
export class CustomErrorDirective implements OnChanges {
  @Input('appCustomError') errorString = '';
  constructor(private el: ElementRef) {}

  get spanElement(): HTMLSpanElement {
    return this.el.nativeElement;
  }

  ngOnChanges(): void {
    this.spanElement.textContent = '';
    if (this.errorString) {
      const validationErrors: ValidationErrors | null | undefined = JSON.parse(
        this.errorString
      );
      if (validationErrors) {
        switch (true) {
          case 'required' in validationErrors:
            this.spanElement.textContent = 'This field is required';
            break;
          case 'pattern' in validationErrors:
            this.spanElement.textContent = 'Invalid pattern';
            break;
          default:
            this.spanElement.textContent = 'Invalid value';
            break;
        }
      }
    }
  }
}
