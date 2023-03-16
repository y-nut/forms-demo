import { Validators } from '@angular/forms';
import { distinctUntilChanged, startWith, Subject, takeUntil } from 'rxjs';
import { CountryCode } from '../../shared/enums/country-code.enum';
import { phoneNumberRegex } from '../../shared/enums/phone-number-regex.enum';
import { ReactiveProfileForm } from './reactive-profile-form.form';

export class ReactiveProfileFormBusinessLogic {
  static applyBusinessLogic(
    profileForm: ReactiveProfileForm,
    destroy$: Subject<void>
  ) {
    ReactiveProfileFormBusinessLogic.handleCountryChange(profileForm, destroy$);
  }

  private static handleCountryChange(
    profileForm: ReactiveProfileForm,
    destroy$: Subject<void>
  ): void {
    profileForm.countryControl.valueChanges
      .pipe(
        startWith(profileForm.countryControl.value),
        distinctUntilChanged(),
        takeUntil(destroy$)
      )
      .subscribe((countryCode) => {
        // Translation hint and label
        switch (countryCode) {
          case CountryCode.CL:
            profileForm.phoneNumberControl.label = 'Número de teléfono';
            profileForm.phoneNumberControl.hint = '+56...';
            break;
          case CountryCode.US:
          default:
            profileForm.phoneNumberControl.label = 'Phone number';
            profileForm.phoneNumberControl.hint = '+1...';
            break;
        }

        // Validations
        profileForm.phoneNumberControl.clearValidators();
        profileForm.phoneNumberControl.reset('', { emitEvent: false });
        switch (countryCode) {
          case CountryCode.US:
            profileForm.phoneNumberControl.setValidators([
              Validators.required,
              Validators.pattern(phoneNumberRegex.US.regex),
              Validators.minLength(phoneNumberRegex.US.length),
              Validators.maxLength(phoneNumberRegex.US.length),
            ]);
            break;
          case CountryCode.CL:
            profileForm.phoneNumberControl.setValidators([
              Validators.required,
              Validators.pattern(phoneNumberRegex.CL.regex),
              Validators.minLength(phoneNumberRegex.CL.length),
              Validators.maxLength(phoneNumberRegex.CL.length),
            ]);
            break;
        }
        profileForm.phoneNumberControl.updateValueAndValidity();
      });
  }
}
