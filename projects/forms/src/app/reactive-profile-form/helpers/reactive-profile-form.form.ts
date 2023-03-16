import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControlExtended } from '../custom-form-elements/select-control/select-control.control';

const formBuilder = new FormBuilder();
export class ReactiveProfileForm extends FormGroup {
  countryControl!: FormControlExtended;
  phoneNumberControl!: FormControlExtended;

  constructor(reactiveProfile?: ReactiveProfileFormKeys) {
    super(ReactiveProfileForm.buildForm().controls);
    this.patchValue(reactiveProfile ?? {});
    this.countryControl = this.get('country') as FormControlExtended;
    this.phoneNumberControl = this.get('phoneNumber') as FormControlExtended;
  }

  static buildForm(): FormGroup<{
    [Name in keyof ReactiveProfileFormKeys]: any;
  }> {
    return formBuilder.group({
      firstName: '',
      lastName: '',
      country: '',
      phoneNumber: '',
    });
  }
}

export interface ReactiveProfileFormKeys {
  firstName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
}
