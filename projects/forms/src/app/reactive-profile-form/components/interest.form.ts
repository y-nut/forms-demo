import { FormGroup } from '@angular/forms';
import { FormControlExtended } from '../../custom-form-elements/form-control-extended.class';

export class InterestGroup extends FormGroup {
  constructor(
    public override controls = new FormGroup({
      name: new FormControlExtended(''),
    }).controls
  ) {
    super(controls);
  }
}
