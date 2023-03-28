import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseControlDirective } from '../base-control.directive';
import { CustomErrorComponent } from '../custom-error/custom-error.component';
import { FormControlExtended } from '../form-control-extended.class';

@Component({
  selector: 'app-date-picker-control',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    CustomErrorComponent,
  ],
})
export class DatePickerComponent extends BaseControlDirective {
  get datePickerControl(): FormControlExtended {
    return this.control;
  }
}
