import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormControlExtended } from '../../custom-form-elements/select-control/select-control.control';
import { Interest, InterestGroup } from '../components/interest.form';

const formBuilder = new FormBuilder();
export class ReactiveProfileForm extends FormGroup {
  countryControl!: FormControlExtended;
  phoneNumberControl!: FormControlExtended;
  displayNameControl!: FormControlExtended;
  interestsArray!: FormArray<InterestGroup>;

  constructor(reactiveProfile?: ReactiveProfileFormKeys) {
    super(ReactiveProfileForm.buildForm().controls);
    this.patchValue(reactiveProfile ?? {});
    this.countryControl = this.get('country') as FormControlExtended;
    this.phoneNumberControl = this.get('phoneNumber') as FormControlExtended;
    this.displayNameControl = this.get('displayName') as FormControlExtended;
    this.interestsArray = this.get('interests') as FormArray<InterestGroup>;

    this.addInterest();
  }

  static buildForm(): FormGroup<{
    [Name in keyof ReactiveProfileFormKeys]: any;
  }> {
    return formBuilder.group({
      displayName: '',
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

export interface ReactiveProfileFormKeys {
  displayName: string;
  country: string;
  phoneNumber: string;
  interests: Interest[];
}
