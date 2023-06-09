import { FormControl } from '@angular/forms';

export class FormControlExtended extends FormControl {
  label?: string;
  hint?: string;
  maxLength?: number;
  minLength?: number;
  aria?: Record<string, string>;
  options?: OptionSelect[];
}

export interface OptionSelect {
  value: string;
  label: string;
}
