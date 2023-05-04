import { FormArray, FormGroup } from '@angular/forms';
import { FormControlExtended } from '../../custom-form-elements/form-control-extended.class';
import { InterestGroup } from '../components/interest.form';

export class ReactiveProfileForm extends FormGroup {
  constructor(
    public override controls = ReactiveProfileForm.buildProfileForm().controls
  ) {
    super(controls);
  }

  static buildProfileForm() {
    return new FormGroup({
      displayName: new FormControlExtended(''),
      country: new FormControlExtended('', { nonNullable: true }),
      phoneNumber: new FormControlExtended(''),
      interests: new FormArray<InterestGroup>([]),
    });
  }

  addInterest(): void {
    this.controls.interests.push(new InterestGroup());
  }
  removeInterest(index: number): void {
    this.controls.interests.removeAt(index);
  }
}
