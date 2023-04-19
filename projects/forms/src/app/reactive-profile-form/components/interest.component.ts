import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroupName, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TextControlComponent } from '../../custom-form-elements/text-control/text-control.component';
import { TranslateModule } from '../../translation/translate.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InterestGroup } from './interest.form';

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
    TranslateModule,
    MatTooltipModule,
  ],
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
  template: `
    <ng-container [formGroup]="interestGroup">
      <mat-card>
        <mat-card-content class="app-interest-card-content">
          <app-text-control formControlName="name" [label]="'interest' | translate"/>
          <button
            type="button"
            mat-icon-button
            color="primary"
            (click)="action.emit('add')"
            [matTooltip]="'addInterest' | translate"
            [attr.aria-label]="'addInterest' | translate"
          >
            <mat-icon inline>add</mat-icon>
          </button>
          <button
            type="button"
            mat-icon-button
            color="warn"
            [matTooltip]="'removeInterest' | translate"
            [attr.aria-label]="'removeInterest' | translate"
            (click)="action.emit('remove')"
          >
            <mat-icon inline>delete</mat-icon>
          </button>
        </mat-card-content>
      </mat-card>
    </ng-container>
  `,
})
export class InterestComponent {
  @Output() action = new EventEmitter<'add' | 'remove'>();
  constructor(private formGroupName: FormGroupName) {}

  get interestGroup(): InterestGroup {
    return this.formGroupName.control as InterestGroup;
  }
}
