import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlContainer,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { TextControlComponent } from '../../custom-form-elements/text-control/text-control.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveProfileForm } from '../helpers/reactive-profile-form.form';

@Component({
  selector: 'app-interest',
  standalone: true,
  imports: [
    CommonModule,
    TextControlComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  template: `
    <mat-card>
      <mat-card-content class="app-interest-card-content">
        <app-text-control [formControl]="control" label="interest"/>
        <button
          type="button"
          mat-icon-button
          color="primary"
          (click)="reactiveForm.addInterest()"
        >
          <mat-icon inline>add</mat-icon>
        </button>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .app-interest-card-content {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterestComponent {
  @Input() index = 0;

  constructor(private controlContainer: ControlContainer) {}

  get reactiveForm(): ReactiveProfileForm {
    return this.controlContainer.control as ReactiveProfileForm;
  }

  get control(): FormControl {
    return this.reactiveForm.interestsArray.controls.at(
      this.index
    ) as FormControl;
  }
}
