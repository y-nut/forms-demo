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

  addInterest(interest?: Interest): void {
    this.interestsArray.push(new InterestGroup(interest));
  }

  removeInterest(index: number): void {
    this.interestsArray.removeAt(index);
  }
}

export class InterestGroup extends FormGroup {
  nameControl!: FormControlExtended;

  constructor(interest?: Interest) {
    super(InterestGroup.buildForm().controls);
    this.nameControl = this.get('name') as FormControlExtended;
    this.patchValue(interest ?? {});
  }

  static buildForm(): FormGroup<{
    [Name in keyof Interest]: any;
  }> {
    return formBuilder.group({
      name: '',
    });
  }
}

export interface ReactiveProfileFormKeys {
  firstName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  interests: Interest[];
}

export interface Interest {
  name: string;
}
