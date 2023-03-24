import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PhoneNumberControlComponent } from './phone-number-control.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { runOnPushChangeDetection } from '../../testing/on-push-change-detection.helper';
import { TranslateModule } from '../../translation/translate.module';

describe('PhoneNumberControlComponent', () => {
  let component: PhoneNumberControlComponent;
  let fixture: ComponentFixture<PhoneNumberControlComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PhoneNumberControlComponent,
        NoopAnimationsModule,
        TranslateModule.forRoot({
          currentLanguage: 'en',
          defaultLanguage: 'en',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhoneNumberControlComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should show inputs', async () => {
    component.hint = 'test';
    component.label = 'test';
    runOnPushChangeDetection(fixture);

    const formField = await loader.getHarness(MatFormFieldHarness);
    const hint = await formField.getTextHints();
    const label = await formField.getLabel();

    expect(hint).toEqual(['test']);
    expect(label).toEqual('test');
  });
});
