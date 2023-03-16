import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveProfileFormRoutingModule } from './reactive-profile-form-routing.module';
import { ReactiveProfileFormComponent } from './reactive-profile-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectControlComponent } from './custom-form-elements/select-control/select-control.component';
import { TextControlComponent } from './custom-form-elements/text-control/text-control.component';
import { DatePickerComponent } from './custom-form-elements/date-picker/date-picker.component';
import { PhoneNumberControlComponent } from './custom-form-elements/phone-number-control/phone-number-control.component';

@NgModule({
  declarations: [ReactiveProfileFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectControlComponent,
    TextControlComponent,
    PhoneNumberControlComponent,
    ReactiveProfileFormRoutingModule,
  ],
})
export class ReactiveProfileFormModule {}