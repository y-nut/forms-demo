import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD,
} from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '../translation/translate.module';
import { DatePickerComponent } from './custom-form-elements/date-picker/date-picker.component';
import { PhoneNumberControlComponent } from './custom-form-elements/phone-number-control/phone-number-control.component';
import { SelectControlComponent } from './custom-form-elements/select-control/select-control.component';
import { TextControlComponent } from './custom-form-elements/text-control/text-control.component';
import { ReactiveProfileFormComponent } from './reactive-profile-form.component';

describe('ReactiveProfileFormComponent', () => {
  let component: ReactiveProfileFormComponent;
  let fixture: ComponentFixture<ReactiveProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactiveProfileFormComponent],
      imports: [
        ReactiveFormsModule,
        DatePickerComponent,
        SelectControlComponent,
        TextControlComponent,
        CommonModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        PhoneNumberControlComponent,
        MatFormFieldModule,
        TranslateModule.forRoot({
          currentLanguage: 'en',
          defaultLanguage: 'en',
        }),
      ],
      providers: [
        {
          provide: MAT_FORM_FIELD,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
