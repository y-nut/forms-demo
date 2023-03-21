import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormArrayName, ReactiveFormsModule } from '@angular/forms';
import { InterestGroup } from '../helpers/reactive-profile-form.form';
import { InterestComponent } from './interest.component';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CommonModule, InterestComponent, ReactiveFormsModule],
  styles: [
    `
      .app-interests-list {
        display: flex;
        gap: 0.5rem;
        flex-direction: column;
      }
    `,
  ],
  host: {
    class: 'app-interests-list',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-interest
      *ngFor="let interest of interestsArray.controls; index as index"
      [index]="index"
    >
    </app-interest>
  `,
})
export class InterestsComponent {
  constructor(private formArray: FormArrayName) {}

  get interestsArray(): FormArray<InterestGroup> {
    return this.formArray.control as FormArray<InterestGroup>;
  }
}
