import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseControlDirective } from '../base-control.directive';

@Component({
  selector: 'app-phone-number-control',
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <input
        [attr.aria-label]="aria['label']"
        [formControl]="phoneControl"
        matInput
        type="tel"
      />
      <mat-hint>{{ hint }}</mat-hint>
      <mat-error *ngIf="phoneControl.invalid">
        {{ phoneControl.errors | json }}
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
  ],
})
export class PhoneNumberControlComponent extends BaseControlDirective {
  get phoneControl(): FormControl {
    return this.control;
  }
}
