import { Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { distinctUntilChanged, startWith, Subject, takeUntil, tap } from 'rxjs';
import { CountryCode } from '../../shared/enums/country-code.enum';
import { Language } from '../../shared/enums/language.enum';
import { phoneNumberRegex } from '../../shared/enums/phone-number-regex.enum';
import { TranslateService } from '../../translation/translate.service';
import { ReactiveProfileForm } from './reactive-profile-form.form';

export class ReactiveProfileFormBusinessLogic {
  constructor(private injector: Injector) {}

  applyBusinessLogic(
    profileForm: ReactiveProfileForm,
    destroy$: Subject<void>
  ) {
    this.handleCountryChange(profileForm, destroy$);
    profileForm.displayNameControl.minLength = 2;
    profileForm.displayNameControl.maxLength = 10;
    profileForm.displayNameControl.setValidators([
      Validators.minLength(profileForm.displayNameControl.minLength),
      Validators.maxLength(profileForm.displayNameControl.maxLength),
    ]);
  }

  private handleCountryChange(
    profileForm: ReactiveProfileForm,
    destroy$: Subject<void>
  ): void {
    profileForm.countryControl.valueChanges
      .pipe(
        startWith(profileForm.countryControl.value),
        distinctUntilChanged(),
        takeUntil(destroy$),
        tap((countryCode) => {
          switch (countryCode) {
            case CountryCode.US:
              this.translateService.setCurrentLanguage(Language.EN);
              break;
            case CountryCode.CL:
              this.translateService.setCurrentLanguage(Language.ES);
              break;
          }
        })
      )
      .subscribe((countryCode) => {
        // Validations
        profileForm.phoneNumberControl.clearValidators();
        profileForm.phoneNumberControl.reset('', { emitEvent: false });
        profileForm.phoneNumberControl.hint = '';
        switch (countryCode) {
          case CountryCode.US:
            profileForm.phoneNumberControl.setValidators([
              Validators.required,
              Validators.pattern(phoneNumberRegex.US.regex),
            ]);
            profileForm.phoneNumberControl.hint = '+1...';
            break;
          case CountryCode.CL:
            profileForm.phoneNumberControl.setValidators([
              Validators.required,
              Validators.pattern(phoneNumberRegex.CL.regex),
            ]);
            profileForm.phoneNumberControl.hint = '+56...';
            break;
        }
        profileForm.phoneNumberControl.updateValueAndValidity();
      });

    this.translateService.changeLanguage$
      .pipe(takeUntil(destroy$), startWith(''))
      .subscribe(() => {
        this.translateFields(profileForm);
      });
  }

  get translateService(): TranslateService {
    return this.injector.get(TranslateService);
  }

  private translate(key: string): string {
    return this.translateService.instant(key);
  }

  private translateFields(profileForm: ReactiveProfileForm) {
    profileForm.displayNameControl.label = this.translate('displayName');
    profileForm.countryControl.label = this.translate('country');
    profileForm.phoneNumberControl.label = this.translate('phoneNumber');
    profileForm.displayNameControl.aria = {
      label: this.translate('yourFirstName'),
    };
    profileForm.countryControl.aria = { label: this.translate('yourCountry') };
    profileForm.phoneNumberControl.aria = {
      label: this.translate('yourPhone'),
    };
  }
}
