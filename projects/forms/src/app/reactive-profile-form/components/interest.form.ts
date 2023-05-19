import { FormGroup } from '@angular/forms';
import { FormControlExtended } from '../../custom-form-elements/form-control-extended.class';

export interface InterestGroupControls {
  name: string;
}
export class InterestGroup extends FormGroup {
  constructor(
    public override controls = InterestGroup.buildInterestForm().controls
  ) {
    super(controls);
  }

  static buildInterestForm(initialState?: InterestGroupControls) {
    const form = new FormGroup({
      name: new FormControlExtended(''),
    });

    form.patchValue(initialState ?? {});
    return form;
  }
}
