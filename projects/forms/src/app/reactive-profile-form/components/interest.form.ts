import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControlExtended } from '../../custom-form-elements/select-control/select-control.control';

const formBuilder = new FormBuilder();

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

export interface Interest {
  name: string;
}
