import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatFormField, MAT_FORM_FIELD } from '@angular/material/form-field';
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
})
export class CustomErrorComponent {
  constructor(@Inject(MAT_FORM_FIELD) public formField: MatFormField) {}
}
