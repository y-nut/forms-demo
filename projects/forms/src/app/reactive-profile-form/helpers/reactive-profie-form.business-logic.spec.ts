import { Subject } from 'rxjs';
import { CountryCode } from '../../shared/enums/country-code.enum';
import { ReactiveProfileFormBusinessLogic } from './reactive-profie-form.business-logic';
import { ReactiveProfileForm } from './reactive-profile-form.form';

describe('It should verify that business rules are correctly applied', () => {
  const destroy$ = new Subject<void>();

  afterAll(() => {
    destroy$.next();
    destroy$.complete();
  });

  it('Country change', () => {
    const profileForm = new ReactiveProfileForm();
    ReactiveProfileFormBusinessLogic.applyBusinessLogic(profileForm, destroy$);

    profileForm.countryControl.setValue(CountryCode.US);
    profileForm.phoneNumberControl.setValue('1234567890');
    expect(profileForm.phoneNumberControl.invalid).toBe(true);
    profileForm.phoneNumberControl.setValue('+1234567890');
    expect(profileForm.phoneNumberControl.valid).toBe(true);
  });
});
