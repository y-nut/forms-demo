import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BaseControlDirective } from '../base-control.directive';
import { CustomErrorComponent } from '../custom-error/custom-error.component';

@Component({
  selector: 'app-select-control',
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <mat-select
        [attr.aria-label]="aria?.['label']"
        [formControl]="selectControl"
      >
        <mat-option *ngFor="let option of options" [value]="option.value">{{
          option.label
        }}</mat-option>
      </mat-select>
      <mat-hint>{{ hint }}</mat-hint>
      <mat-error>
        <app-custom-error/>
      </mat-error>
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
    CustomErrorComponent,
  ],
})
export class SelectControlComponent extends BaseControlDirective {
  @Input() options: { value: string; label: string }[] = [];

  get selectControl(): FormControl {
    return this.control;
  }
}
