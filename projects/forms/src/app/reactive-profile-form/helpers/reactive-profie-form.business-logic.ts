import { Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { distinctUntilChanged, startWith, Subject, takeUntil, tap } from 'rxjs';
import { CountryCode } from '../../shared/enums/country-code.enum';
import { Language } from '../../shared/enums/language.enum';
import { phoneNumberRegex } from '../../shared/enums/phone-number-regex.enum';
import { TranslateService } from '../../translation/translate.service';
import { ReactiveProfileForm } from './reactive-profile-form.form';

export class ReactiveProfileFormBusinessLogic {
  constructor(private injector: Injector, private destroy$: Subject<void>) {}

  applyBusinessLogic(profileForm: ReactiveProfileForm) {
    this.handleCountryChange(profileForm);
    profileForm.controls.displayName.minLength = 2;
    profileForm.controls.displayName.maxLength = 10;
    profileForm.controls.displayName.setValidators([
      Validators.required,
      Validators.minLength(profileForm.controls.displayName.minLength),
      Validators.maxLength(profileForm.controls.displayName.maxLength),
    ]);
    profileForm.controls.interests.setValidators([
      Validators.required,
      Validators.minLength(1),
    ]);
  }

  private handleCountryChange(profileForm: ReactiveProfileForm): void {
    profileForm.controls.country.valueChanges
      .pipe(
        startWith(profileForm.controls.country.value),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
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
        profileForm.controls.phoneNumber.clearValidators();
        profileForm.controls.phoneNumber.reset('', { emitEvent: false });
        profileForm.controls.phoneNumber.hint = '';
        switch (countryCode) {
          case CountryCode.US:
            profileForm.controls.phoneNumber.setValidators([
              Validators.required,
              Validators.pattern(phoneNumberRegex.US.regex),
            ]);
            profileForm.controls.phoneNumber.hint = '+1...';
            break;
          case CountryCode.CL:
            profileForm.controls.phoneNumber.setValidators([
              Validators.required,
              Validators.pattern(phoneNumberRegex.CL.regex),
            ]);
            profileForm.controls.phoneNumber.hint = '+56...';
            break;
        }
        profileForm.controls.phoneNumber.updateValueAndValidity();
      });

    this.translateService.changeLanguage$
      .pipe(takeUntil(this.destroy$), startWith(''))
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
    profileForm.controls.displayName.label = this.translate('displayName');
    profileForm.controls.country.label = this.translate('country');
    profileForm.controls.phoneNumber.label = this.translate('phoneNumber');
    profileForm.controls.displayName.aria = {
      label: this.translate('yourDisplayName'),
    };
    profileForm.controls.country.aria = {
      label: this.translate('yourCountry'),
    };
    profileForm.controls.phoneNumber.aria = {
      label: this.translate('yourPhone'),
    };
    profileForm.controls.country.options = [
      {
        label: this.translate('countries.' + CountryCode.US),
        value: CountryCode.US,
      },
      {
        label: this.translate('countries.' + CountryCode.CL),
        value: CountryCode.CL,
      },
    ];
  }
}
