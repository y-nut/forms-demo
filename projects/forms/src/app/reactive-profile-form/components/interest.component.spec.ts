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

describe('InterestComponent', () => {
  let component: InterestComponent;
  let fixture: ComponentFixture<InterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestComponent, NoopAnimationsModule, ReactiveFormsModule],
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
    }).compileComponents();

    fixture = TestBed.createComponent(InterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
