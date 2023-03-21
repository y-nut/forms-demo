import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { ReactiveProfileForm } from '../helpers/reactive-profile-form.form';
import { InterestComponent } from './interest.component';
import { TranslateModule } from '../../translation/translate.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [
    CommonModule,
    InterestComponent,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
  styles: [
    `
      .app-interests-list {
        display: flex;
        gap: 0.5rem;
        flex-direction: column;
      }
      .app-interests-header {
        display: flex;
        gap: 1rem;
      }
    `,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div formArrayName="interests">
      <div class="app-interests-header">
        <h2>{{'interests' | translate | titlecase}}</h2>
        <button
          *ngIf="!profileForm.interestsArray.length"
          mat-mini-fab
          color="primary"
          [matTooltip]="'addInterest' | translate"
          [attr.aria-label]="'addInterest' | translate"
          (click)="profileForm.addInterest()"
        >
          <mat-icon>add</mat-icon>
        </button>
      </div>
      <div class="app-interests-list">
      <app-interest
          *ngFor="let interestGroup of profileForm.interestsArray.controls; index as index"
          [formGroupName]="index"/>
      </div>

    </div>
  `,
})
export class InterestsComponent {
  constructor(private controlContainer: ControlContainer) {}
  get profileForm(): ReactiveProfileForm {
    return this.controlContainer.control as ReactiveProfileForm;
  }
}
