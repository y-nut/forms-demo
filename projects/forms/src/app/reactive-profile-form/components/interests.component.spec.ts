import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  AbstractControlDirective,
  ControlContainer,
  FormGroupDirective,
} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FakeControlContainer } from '../../testing/control-container-fake.helper';
import { ReactiveProfileForm } from '../helpers/reactive-profile-form.form';
import { InterestComponent } from './interests.component';

describe('InterestComponent', () => {
  let component: InterestComponent;
  let fixture: ComponentFixture<InterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestComponent, NoopAnimationsModule],
      providers: [
        {
          provide: ControlContainer,
          useFactory: () => new FakeControlContainer(new ReactiveProfileForm()),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(InterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
