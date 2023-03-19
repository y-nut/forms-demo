import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseControlDirective } from '../base-control.directive';

@Component({
  selector: 'app-text-control',
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <input
        [attr.aria-label]="aria?.['label']"
        [formControl]="textControl"
        matInput
      />
    </mat-form-field>
  `,
  styleUrls: ['./text-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})
export class TextControlComponent extends BaseControlDirective {
  get textControl(): FormControl {
    return this.control;
  }
}
