import { FormArray, FormGroup } from '@angular/forms';
import { FormControlExtended } from '../../custom-form-elements/form-control-extended.class';
import { InterestGroup } from '../components/interest.form';
import { CountryCode } from '../../shared/enums/country-code.enum';

export interface ReactiveProfileFormControls {
  displayName: string;
  country: CountryCode;
  phoneNumber: string;
  interests: { name: string }[];
}
export class ReactiveProfileForm extends FormGroup {
  constructor(
    public override controls = ReactiveProfileForm.buildProfileForm().controls
  ) {
    super(controls);
  }

  static buildProfileForm(initialState?: ReactiveProfileFormControls) {
    const form = new FormGroup({
      displayName: new FormControlExtended('', { nonNullable: true }),
      country: new FormControlExtended(CountryCode.US, { nonNullable: true }),
      phoneNumber: new FormControlExtended('', { nonNullable: true }),
      interests: new FormArray<InterestGroup>([]),
    });

    form.patchValue(initialState ?? {});
    initialState?.interests?.forEach((interest) => {
      form.controls.interests.push(
        new InterestGroup(InterestGroup.buildInterestForm(interest).controls)
      );
    });
    return form;
  }

  addInterest(): void {
    this.controls.interests.push(new InterestGroup());
  }
  removeInterest(index: number): void {
    this.controls.interests.removeAt(index);
  }
  clearInterests(): void {
    this.controls.interests.clear();
  }

  override reset(): void {
    super.reset();
    this.clearInterests();
    this.addInterest();
  }
}
