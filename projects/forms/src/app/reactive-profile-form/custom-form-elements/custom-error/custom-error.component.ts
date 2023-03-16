import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MatError,
  MatFormField,
  MAT_ERROR,
  MAT_FORM_FIELD,
} from '@angular/material/form-field';
import { StringifyPipe } from '../../../shared/pipes/stringify.pipe';
import { CustomErrorDirective } from './custom-error.directive';

@Component({
  selector: 'app-custom-error',
  template: `
    <span
      [appCustomError]="formField._control.ngControl?.errors | stringify"
    ></span>
  `,
  styleUrls: ['./custom-error.component.scss'],
  standalone: true,
  providers: [
    {
      provide: MAT_FORM_FIELD,
      useExisting: MatFormField,
    },
  ],
  imports: [CommonModule, CustomErrorDirective, StringifyPipe],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomErrorComponent {
  constructor(@Inject(MAT_FORM_FIELD) public formField: MatFormField) {
    console.log(formField._control);
  }

  print() {
    console.log(this.formField);
    console.log(this.formField._control?.ngControl?.errors);
  }
}
