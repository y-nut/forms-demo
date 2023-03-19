import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExampleForm } from './example-form.helpers';
import { ForbiddenNameDirective } from './forbidden-name.directive';
import { A11yModule } from '@angular/cdk/a11y';
@Component({
  selector: 'app-template-driven-form-example',
  standalone: true,
  imports: [CommonModule, FormsModule, ForbiddenNameDirective, A11yModule],
  template: `
    <h2>Template driven example form</h2>
    <form #myForm="ngForm" (ngSubmit)="onSubmit(templateDrivenForm)" novalidate>
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        class="form-control"
        required
        minlength="4"
        appForbiddenName="bob"
        [(ngModel)]="templateDrivenForm.name"
        #name="ngModel"
        cdkFocusInitial
      />

      <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert">
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
export class TemplateDrivenFormExampleComponent {
  templateDrivenForm: ExampleForm = {
    name: '',
    lastName: '',
  };

  onSubmit(form: ExampleForm): void {
    console.log(form);
  }
}
