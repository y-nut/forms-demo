import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseControlDirective } from '../base-control.directive';
import { CustomErrorComponent } from '../custom-error/custom-error.component';

@Component({
  selector: 'app-phone-number-control',
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <input
        [attr.aria-label]="aria?.['label']"
        [attr.minlength]="minLength"
        [attr.maxlength]="maxLength"
        [formControl]="phoneControl"
        matInput
        type="tel"
      />
      <mat-hint>{{ hint }}</mat-hint>
      <mat-error>
        <app-custom-error/>
      </mat-error>
    </mat-form-field>
  `,
  standalone: true,
  styleUrls: ['./phone-number-control.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CustomErrorComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneNumberControlComponent extends BaseControlDirective {
  @Input() maxLength: unknown;
  @Input() minLength: unknown;

  get phoneControl(): FormControl {
    return this.control;
  }
}
