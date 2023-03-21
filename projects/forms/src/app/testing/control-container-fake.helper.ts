import { AbstractControl, AbstractControlDirective } from '@angular/forms';

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
