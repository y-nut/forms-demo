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

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [
    CommonModule,
    InterestComponent,
    ReactiveFormsModule,
    TranslateModule,
  ],
  styles: [
    `
      .app-interests-list {
        display: flex;
        gap: 0.5rem;
        flex-direction: column;
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
      <h2>{{'interests' | translate | titlecase}}</h2>
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
