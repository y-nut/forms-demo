import { FormBuilder, FormGroup } from '@angular/forms';
const formBuilder = new FormBuilder();
export interface Interest {
  name: string;
}

export class InterestGroup extends FormGroup {
  constructor(interest?: Interest) {
    super(InterestGroup.buildForm(interest).controls);
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
