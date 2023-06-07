import { HttpClient, HttpHandler } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { CountryCode } from '../../shared/enums/country-code.enum';
import { TranslateService } from '../../translation/translate.service';
import { ReactiveProfileFormBusinessLogicService } from './reactive-profie-form.business-logic';
import { ReactiveProfileForm } from './reactive-profile-form.form';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '../../translation/translate.module';

describe('ReactiveProfileFormBusinessLogicService', () => {
  let service: ReactiveProfileFormBusinessLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          currentLanguage: 'en',
          defaultLanguage: 'en',
        }),
      ],
      providers: [ReactiveProfileFormBusinessLogicService],
    });
    service = TestBed.inject(ReactiveProfileFormBusinessLogicService);
  });

  it('It should verify that business rules are correctly applied when country change', () => {
    const profileForm = new ReactiveProfileForm();
    service.applyBusinessLogic(profileForm).subscribe();

    profileForm.controls.country.setValue(CountryCode.US);
    profileForm.controls.phoneNumber.setValue('1234567890');
    expect(profileForm.controls.phoneNumber.invalid).toBe(true);
    profileForm.controls.phoneNumber.setValue('+1234567890');
    expect(profileForm.controls.phoneNumber.valid).toBe(true);
  });
});
