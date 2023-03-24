import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControlExtended } from '../../custom-form-elements/form-control-extended.class';

const formBuilder = new FormBuilder();

export class InterestGroup extends FormGroup {
  nameControl!: FormControlExtended;

  constructor(interest?: Interest) {
    super(InterestGroup.buildForm(interest).controls);
    this.nameControl = this.get('name') as FormControlExtended;
  }

  static buildForm(interest?: Interest): FormGroup<{
    [Name in keyof Interest]: any;
  }> {
    const form = formBuilder.group({
      name: '',
    });
    form.patchValue(interest ?? {});
    return form;
  }
}

export interface Interest {
  name: string;
}
