import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneNumberControlComponent } from './phone-number-control.component';

describe('PhoneNumberControlComponent', () => {
  let component: PhoneNumberControlComponent;
  let fixture: ComponentFixture<PhoneNumberControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PhoneNumberControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneNumberControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
