import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormArray,
  FormArrayName,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  InterestGroup,
  ReactiveProfileForm,
} from '../helpers/reactive-profile-form.form';
import { InterestComponent } from './interest.component';
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
      ],
      providers: [
        {
          provide: FormArrayName,
          useFactory: () => {
            return {
              control: new FormArray([new InterestGroup()]),
            };
          },
        },
        {
          provide: FormGroupDirective,
          useFactory: () => {
            const formGroupDirective = new FormGroupDirective([], []);
            formGroupDirective.form = new ReactiveProfileForm();
            return formGroupDirective;
          },
        },
      ],
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
