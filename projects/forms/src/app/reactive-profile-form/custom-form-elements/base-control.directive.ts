import { Directive, Injector, Input, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlName,
  FormGroupDirective,
  NgControl,
} from '@angular/forms';

@Directive({
  host: {
    '(blue)': 'onTouch()',
  },
})
export class BaseControlDirective implements ControlValueAccessor {
  @Input() label = '';
  @Input() hint = '';

  onChange: any = () => {};
  onTouch: any = () => {};
  private _control = new FormControl();
  private _setControl = false;

  constructor(
    private injector: Injector,
    @Optional() @Self() private ngControl?: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  get formGroupDirective(): FormGroupDirective | undefined {
    return this.injector.get(FormGroupDirective);
  }

  get control(): FormControl {
    switch (!this._setControl) {
      case this.ngControl instanceof FormControlName:
        const formControlName = this.ngControl as FormControlName;
        if (
          typeof formControlName.name === 'string' &&
          this.formGroupDirective
        ) {
          this._control = this.formGroupDirective.form.get(
            formControlName.name
          ) as FormControl;
          this._setControl = true;
        }
        break;
    }

    return this._control;
  }

  writeValue(obj: any): void {
    this.control.setValue(obj, { emitEvent: false });
  }
  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: void) {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled && this.control.enabled) {
      this.control.disable();
    }
    if (!isDisabled && this.control.disabled) {
      this.control.enable();
    }
  }
}