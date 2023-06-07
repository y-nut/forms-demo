import { Injectable, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  distinctUntilChanged,
  merge,
  Observable,
  startWith,
  Subject,
  tap,
} from 'rxjs';
import { CountryCode } from '../../shared/enums/country-code.enum';
import { Language } from '../../shared/enums/language.enum';
import { phoneNumberRegex } from '../../shared/enums/phone-number-regex.enum';
import { TranslateService } from '../../translation/translate.service';
import { ReactiveProfileForm } from './reactive-profile-form.form';

@Injectable()
export class ReactiveProfileFormBusinessLogicService {
  constructor(private translate: TranslateService) {}

  applyBusinessLogic(profileForm: ReactiveProfileForm): Observable<void> {
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
    return this.handleCountryChange(profileForm);
  }

  private handleCountryChange(
    profileForm: ReactiveProfileForm
  ): Observable<void> {
    return merge(
      profileForm.controls.country.valueChanges.pipe(
        startWith(profileForm.controls.country.value),
        distinctUntilChanged(),
        tap((countryCode) => {
          switch (countryCode) {
            case CountryCode.US:
              this.translate.setCurrentLanguage(Language.EN);
              break;
            case CountryCode.CL:
              this.translate.setCurrentLanguage(Language.ES);
              break;
          }
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
        })
      ),
      this.translate.changeLanguage$.pipe(
        tap(() => {
          this.translateFields(profileForm);
        })
      )
    );
  }

  private translateFields(profileForm: ReactiveProfileForm) {
    profileForm.controls.displayName.label =
      this.translate.instant('displayName');
    profileForm.controls.country.label = this.translate.instant('country');
    profileForm.controls.phoneNumber.label =
      this.translate.instant('phoneNumber');
    profileForm.controls.displayName.aria = {
      label: this.translate.instant('yourDisplayName'),
    };
    profileForm.controls.country.aria = {
      label: this.translate.instant('yourCountry'),
    };
    profileForm.controls.phoneNumber.aria = {
      label: this.translate.instant('yourPhone'),
    };
    profileForm.controls.country.options = [
      {
        label: this.translate.instant('countries.' + CountryCode.US),
        value: CountryCode.US,
      },
      {
        label: this.translate.instant('countries.' + CountryCode.CL),
        value: CountryCode.CL,
      },
    ];
  }
}
