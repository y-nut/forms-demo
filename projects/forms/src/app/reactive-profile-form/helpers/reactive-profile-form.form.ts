import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormControlExtended } from '../../custom-form-elements/form-control-extended.class';
import { Interest, InterestGroup } from '../components/interest.form';

const formBuilder = new FormBuilder();
export class ReactiveProfileForm extends FormGroup {
  countryControl!: FormControlExtended;
  phoneNumberControl!: FormControlExtended;
  displayNameControl!: FormControlExtended;
  interestsArray!: FormArray<InterestGroup>;

  constructor(reactiveProfile?: ReactiveProfileFormKeys) {
    super(ReactiveProfileForm.buildForm(reactiveProfile).controls);
    this.countryControl = this.get('country') as FormControlExtended;
    this.phoneNumberControl = this.get('phoneNumber') as FormControlExtended;
    this.displayNameControl = this.get('displayName') as FormControlExtended;
    this.interestsArray = this.get('interests') as FormArray<InterestGroup>;

    this.addInterest();
  }

  static buildForm(reactiveProfile?: ReactiveProfileFormKeys): FormGroup<{
    [Name in keyof ReactiveProfileFormKeys]: any;
  }> {
    const form = formBuilder.group({
      displayName: '',
      country: '',
      phoneNumber: '',
      interests: formBuilder.array([]),
    });
    form.patchValue(reactiveProfile ?? {});
    return form;
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
