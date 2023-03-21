import {
  AbstractControl,
  AbstractControlDirective,
  FormArray,
  FormArrayName,
  FormGroupDirective,
  FormGroupName,
} from '@angular/forms';
import { InterestGroup } from '../reactive-profile-form/components/interest.form';
import { ReactiveProfileForm } from '../reactive-profile-form/helpers/reactive-profile-form.form';

export class FakeControlContainer extends AbstractControlDirective {
  get control(): AbstractControl<any, any> | null {
    return this._control;
  }
  private _control: AbstractControl<any, any> | null = null;
  constructor(controlForm: AbstractControl<any, any>) {
    super();
    this._control = controlForm;
  }
}

export const FormGroupNameProvider = {
  provide: FormGroupName,
  useFactory: () => {
    return {
      control: new InterestGroup(),
    };
  },
};
export const FormArrayNameProvider = {
  provide: FormArrayName,
  useFactory: () => {
    return {
      control: new FormArray([new InterestGroup()]),
    };
  },
};
export const FormGroupDirectiveProvider = {
  provide: FormGroupDirective,
  useFactory: () => {
    const formGroupDirective = new FormGroupDirective([], []);
    formGroupDirective.form = new ReactiveProfileForm();
    return formGroupDirective;
  },
};
