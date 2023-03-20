import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormControlExtended } from '../../custom-form-elements/select-control/select-control.control';

const formBuilder = new FormBuilder();
export class ReactiveProfileForm extends FormGroup {
  countryControl!: FormControlExtended;
  phoneNumberControl!: FormControlExtended;
  firstNameControl!: FormControlExtended;
  lastNameControl!: FormControlExtended;
  interestsArray!: FormArray;

  constructor(reactiveProfile?: ReactiveProfileFormKeys) {
    super(ReactiveProfileForm.buildForm().controls);
    this.patchValue(reactiveProfile ?? {});
    this.countryControl = this.get('country') as FormControlExtended;
    this.phoneNumberControl = this.get('phoneNumber') as FormControlExtended;
    this.firstNameControl = this.get('firstName') as FormControlExtended;
    this.lastNameControl = this.get('lastName') as FormControlExtended;
    this.interestsArray = this.get('interests') as FormArray;

    this.addInterest();
  }

  static buildForm(): FormGroup<{
    [Name in keyof ReactiveProfileFormKeys]: any;
  }> {
    return formBuilder.group({
      firstName: '',
      lastName: '',
      country: '',
      phoneNumber: '',
      interests: formBuilder.array([]),
    });
  }

  addInterest(): void {
    const control = formBuilder.control('');
    this.interestsArray.push(control);
  }
}

export interface ReactiveProfileFormKeys {
  firstName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  interests: string[];
}
