import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '../translation/translate.module';
import { PhoneNumberControlComponent } from '../custom-form-elements/phone-number-control/phone-number-control.component';
import { SelectControlComponent } from '../custom-form-elements/select-control/select-control.component';
import { TextControlComponent } from '../custom-form-elements/text-control/text-control.component';
import { ReactiveProfileFormComponent } from './reactive-profile-form.component';
import { InterestComponent } from './components/interests.component';
import { ReactiveProfileForm } from './helpers/reactive-profile-form.form';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

describe('ReactiveProfileFormComponent', () => {
  let component: ReactiveProfileFormComponent;
  let fixture: ComponentFixture<ReactiveProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactiveProfileFormComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        SelectControlComponent,
        TextControlComponent,
        PhoneNumberControlComponent,
        InterestComponent,
        TranslateModule,
        MatSlideToggleModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        TranslateModule.forRoot({
          currentLanguage: 'en',
          defaultLanguage: 'en',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveProfileFormComponent);
    component = fixture.componentInstance;
    component.profileForm = new ReactiveProfileForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
