import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ControlContainer,
  FormArray,
  FormArrayName,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  FakeControlContainer,
  FormGroupDirectiveProvider,
} from '../../testing/control-providers.helper';
import { TranslateModule } from '../../translation/translate.module';
import { ReactiveProfileForm } from '../helpers/reactive-profile-form.form';
import { InterestComponent } from './interest.component';
import { InterestGroup } from './interest.form';
import { InterestsComponent } from './interests.component';

describe('InterestsComponent', () => {
  let component: InterestsComponent;
  let fixture: ComponentFixture<InterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InterestComponent,
        InterestsComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          currentLanguage: 'en',
          defaultLanguage: 'en',
        }),
      ],
      providers: [FormGroupDirectiveProvider],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(InterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
