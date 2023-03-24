import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TranslateService } from '../../translation/translate.service';

@Directive({
  selector: '[appCustomError]',
  standalone: true,
})
export class CustomErrorDirective implements OnChanges, OnInit, OnDestroy {
  @Input('appCustomError') errorString = '';
  private destroy$ = new Subject();
  constructor(private el: ElementRef, private translate: TranslateService) {}

  get spanElement(): HTMLSpanElement {
    return this.el.nativeElement;
  }

  ngOnInit(): void {
    this.translate.currentLanguageFile$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.setError();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  ngOnChanges(): void {
    this.setError();
  }

  private setError() {
    this.spanElement.textContent = '';
    if (this.errorString) {
      const validationErrors: ValidationErrors | null | undefined = JSON.parse(
        this.errorString
      );
      if (validationErrors) {
        switch (true) {
          case 'required' in validationErrors:
            this.spanElement.textContent = this.translate.instant(
              'fieldError.required'
            );
            break;
          case 'pattern' in validationErrors:
            this.spanElement.textContent =
              this.translate.instant('fieldError.pattern');
            break;
          case 'minlength' in validationErrors:
            this.spanElement.textContent = this.translate.instant(
              'fieldError.minlength',
              { minlength: validationErrors['minlength'].requiredLength }
            );
            break;
          case 'maxlength' in validationErrors:
            this.spanElement.textContent = this.translate.instant(
              'fieldError.maxlength',
              { maxlength: validationErrors['maxlength'].requiredLength }
            );
            break;
          default:
            this.spanElement.textContent =
              this.translate.instant('fieldError.invalid');
            break;
        }
      }
    }
  }
}
