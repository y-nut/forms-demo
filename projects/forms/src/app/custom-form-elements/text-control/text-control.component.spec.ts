import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '../../translation/translate.module';
import { TextControlComponent } from './text-control.component';

describe('TextControlComponent', () => {
  let component: TextControlComponent;
  let fixture: ComponentFixture<TextControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TextControlComponent,
        NoopAnimationsModule,
        TranslateModule.forRoot({
          currentLanguage: 'en',
          defaultLanguage: 'en',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TextControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
