import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BaseControlDirective } from '../base-control.directive';

@Component({
  selector: 'app-select-control',
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <mat-select [formControl]="selectControl">
        <mat-option *ngFor="let option of options" [value]="option.value">{{
          option.label
        }}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['./select-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class SelectControlComponent extends BaseControlDirective {
  @Input() options: { value: string; label: string }[] = [];

  get selectControl(): FormControl {
    return this.control;
  }
}
