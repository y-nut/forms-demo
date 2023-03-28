import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseControlDirective } from '../base-control.directive';
import { CustomErrorComponent } from '../custom-error/custom-error.component';
import { FormControlExtended } from '../form-control-extended.class';

@Component({
  selector: 'app-text-control',
  styleUrls: ['./text-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CustomErrorComponent,
  ],
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <input
        [attr.aria-label]="textControl.aria?.['label']"
        [formControl]="textControl"
        [attr.minlength]="textControl.minLength"
        [attr.maxlength]="textControl.maxLength"
        matInput
      />
      <mat-hint>{{ hint }}</mat-hint>
      <mat-error>
        <app-custom-error/>
      </mat-error>
    </mat-form-field>
  `,
})
export class TextControlComponent extends BaseControlDirective {
  get textControl(): FormControlExtended {
    return this.control;
  }
}
