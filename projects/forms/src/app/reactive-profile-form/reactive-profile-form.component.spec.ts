import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePickerComponent } from './custom-form-elements/date-picker/date-picker.component';
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
