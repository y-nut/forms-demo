import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { forbiddenNameValidator } from './example-form.helpers';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-reactive-form-example',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, A11yModule],
  template: `
    <h2>Reactive example form</h2>
    <form *ngIf="name" [formGroup]="heroForm">
      <label for="name">Name</label>

      <input
        type="text"
        id="name"
        class="form-control"
        formControlName="name"
        required
        cdkFocusInitial
      />

      <div
        *ngIf="name.invalid && (name.dirty || name.touched)"
        class="alert alert-danger"
      >
        <div *ngIf="name.errors?.['required']">Name is required.</div>
        <div *ngIf="name.errors?.['minlength']">
          Name must be at least 4 characters long.
        </div>
        <div *ngIf="name.errors?.['forbiddenName']">Name cannot be Bob.</div>
      </div>
    </form>
  `,
  styleUrls: ['./example-form.styles.scss'],
})
export class ReactiveFormExampleComponent {
  heroForm = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        forbiddenNameValidator(/bob/i),
      ],
    ],
    alterEgo: '',
    power: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

  get name() {
    return this.heroForm.get('name');
  }

  get power() {
    return this.heroForm.get('power');
  }
}
