import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroupDirective,
  FormGroupName,
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
            (click)="removeInterest()"
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
  constructor(
    private formGroupDirective: FormGroupDirective,
    private formGroupName: FormGroupName
  ) {}

  get profileForm(): ReactiveProfileForm {
    return this.formGroupDirective.form as ReactiveProfileForm;
  }

  get interestGroup(): InterestGroup {
    return this.formGroupName.control as InterestGroup;
  }

  removeInterest(): void {
    this.profileForm.removeInterest(this.formGroupName.name as number);
  }
}
