import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appForbiddenName]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenNameDirective,
      multi: true,
    },
  ],
})
export class ForbiddenNameDirective implements Validator {
  @Input('appForbiddenName') forbiddenName = '';

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const nameRe = new RegExp(this.forbiddenName, 'i');
    const forbidden = nameRe.test(control.value);
    const validation = forbidden
      ? { forbiddenName: { value: control.value } }
      : null;
    return validation;
  }
  registerOnValidatorChange?(fn: () => void): void {
    // throw new Error('Method not implemented.');
  }
}
