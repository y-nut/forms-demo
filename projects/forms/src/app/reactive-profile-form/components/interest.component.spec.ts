import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormArray,
  FormArrayName,
  FormGroupDirective,
  FormGroupName,
  ReactiveFormsModule,
} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroupNameProvider } from '../../testing/control-providers.helper';
import { TranslateModule } from '../../translation/translate.module';
import { ReactiveProfileForm } from '../helpers/reactive-profile-form.form';
import { InterestComponent } from './interest.component';
import { InterestGroup } from './interest.form';

describe('InterestComponent', () => {
  let component: InterestComponent;
  let fixture: ComponentFixture<InterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InterestComponent,
        NoopAnimationsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          currentLanguage: 'en',
          defaultLanguage: 'en',
        }),
      ],
      providers: [FormGroupNameProvider],
    }).compileComponents();

    fixture = TestBed.createComponent(InterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
