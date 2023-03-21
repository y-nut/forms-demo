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

    const nameValidator = [Validators.minLength(2), Validators.maxLength(10)];
    profileForm.firstNameControl.setValidators(nameValidator);
    profileForm.lastNameControl.setValidators(nameValidator);
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
        ReactiveProfileFormBusinessLogic.translate(profileForm);
        // Validations
        profileForm.phoneNumberControl.clearValidators();
        profileForm.phoneNumberControl.reset('', { emitEvent: false });
        switch (countryCode) {
          case CountryCode.US:
            profileForm.phoneNumberControl.setValidators([
              Validators.required,
              Validators.pattern(phoneNumberRegex.US.regex),
            ]);
            break;
          case CountryCode.CL:
            profileForm.phoneNumberControl.setValidators([
              Validators.required,
              Validators.pattern(phoneNumberRegex.CL.regex),
            ]);
            break;
        }
        profileForm.phoneNumberControl.updateValueAndValidity();
      });
  }

  private static translate(profileForm: ReactiveProfileForm) {
    profileForm.firstNameControl.label = 'First name';
    profileForm.lastNameControl.label = 'Last name';
    profileForm.countryControl.label = 'Country';
    profileForm.phoneNumberControl.label = 'Phone number';
    profileForm.phoneNumberControl.hint = '';
    profileForm.phoneNumberControl.minLength = undefined;
    profileForm.phoneNumberControl.maxLength = undefined;
    profileForm.firstNameControl.aria = { label: 'Your first name' };
    profileForm.lastNameControl.aria = { label: 'Your last name' };
    profileForm.countryControl.aria = { label: 'Your country' };
    profileForm.phoneNumberControl.aria = { label: 'your phone number' };

    switch (profileForm.countryControl.value) {
      case CountryCode.CL:
        profileForm.firstNameControl.label = 'Nombre';
        profileForm.lastNameControl.label = 'Apellido';
        profileForm.countryControl.label = 'País';
        profileForm.phoneNumberControl.label = 'Número de teléfono';
        profileForm.phoneNumberControl.hint = '+56...';
        profileForm.phoneNumberControl.minLength = phoneNumberRegex.CL.length;
        profileForm.phoneNumberControl.maxLength = phoneNumberRegex.CL.length;
        break;
      case CountryCode.US:
        profileForm.phoneNumberControl.hint = '+1...';
        profileForm.phoneNumberControl.minLength = phoneNumberRegex.US.length;
        profileForm.phoneNumberControl.maxLength = phoneNumberRegex.US.length;
        break;
    }
  }
}
