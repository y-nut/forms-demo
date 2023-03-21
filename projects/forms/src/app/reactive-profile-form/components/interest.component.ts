import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormArrayName,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  InterestGroup,
  ReactiveProfileForm,
} from '../helpers/reactive-profile-form.form';
import { TextControlComponent } from '../../custom-form-elements/text-control/text-control.component';

@Component({
  selector: 'app-interest',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TextControlComponent,
  ],
  template: `
    <ng-container [formGroup]="interestGroup">
      <mat-card>
        <mat-card-content class="app-interest-card-content">
          <app-text-control [formControl]="interestGroup.nameControl" label="interest"/>
          <button
            type="button"
            mat-icon-button
            color="primary"
            (click)="profileForm.addInterest()"
          >
            <mat-icon inline>add</mat-icon>
          </button>
          <button
            type="button"
            mat-icon-button
            color="warn"
            (click)="profileForm.removeInterest(index)"
          >
            <mat-icon inline>delete</mat-icon>
          </button>
        </mat-card-content>
      </mat-card>
    </ng-container>
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
  constructor(
    private formArray: FormArrayName,
    private formGroupDirective: FormGroupDirective
  ) {}

  get profileForm(): ReactiveProfileForm {
    return this.formGroupDirective.form as ReactiveProfileForm;
  }

  get interestsArray(): FormArray<InterestGroup> {
    return this.formArray.control;
  }

  get interestGroup(): InterestGroup {
    return this.interestsArray.at(this.index);
  }
}
