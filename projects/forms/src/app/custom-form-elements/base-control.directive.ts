import { Directive, Injector, Input, Optional, Self } from '@angular/core';
import {
  ControlValueAccessor,
  FormControlName,
  FormGroupDirective,
  NgControl,
} from '@angular/forms';
import { FormControlExtended } from './form-control-extended.class';

@Directive({
  host: {
    '(blue)': 'onTouch()',
  },
})
export class BaseControlDirective implements ControlValueAccessor {
  @Input()
  set label(label: string) {
    this._label = label;
  }
  get label(): string {
    return this._label ? this._label : this.control.label ?? '';
  }
  private _label = '';
  @Input()
  set hint(hint: string) {
    this._hint = hint;
  }
  get hint(): string {
    return this._hint ? this._hint : this.control.hint ?? '';
  }
  private _hint = '';
  @Input()
  set aria(aria: Record<string, string>) {
    this._aria = aria;
  }
  get aria(): Record<string, string> {
    return this._aria ? this._aria : this.control.aria ?? {};
  }
  private _aria = {};

  onChange: any = () => {};
  onTouch: any = () => {};
  private _control = new FormControlExtended();
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

  get control(): FormControlExtended {
    if (!this._setControl) {
      const formControlName = this.ngControl as FormControlName;
      if (
        typeof formControlName?.name === 'string' &&
        this.formGroupDirective
      ) {
        this._control = this.formGroupDirective.form.get(
          formControlName.name
        ) as FormControlExtended;
        this._setControl = true;
      } else if (this.ngControl?.control) {
        this._control = this.ngControl?.control as FormControlExtended;
        this._setControl = true;
      }
    }

    return this._control;
  }

  writeValue(obj: any): void {
    if (this.control.value === obj) return;
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
