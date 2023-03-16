import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ReactiveProfileForm } from './helpers/reactive-profile-form.form';
import { ReactiveProfileFormBusinessLogic } from './helpers/reactive-profie-form.business-logic';
import { CountryCode } from '../shared/enums/country-code.enum';
import { TranslateService } from '../shared/translation/translate.service';
import { Language } from '../shared/enums/language.enum';

@Component({
  selector: 'app-reactive-profile-form',
  templateUrl: './reactive-profile-form.component.html',
  styleUrls: ['./reactive-profile-form.component.scss'],
})
export class ReactiveProfileFormComponent implements OnDestroy, OnInit {
  private _destroy$ = new Subject<void>();
  profileForm!: ReactiveProfileForm;
  CountryCode = CountryCode;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.profileForm = new ReactiveProfileForm();
    ReactiveProfileFormBusinessLogic.applyBusinessLogic(
      this.profileForm,
      this._destroy$
    );

    this.profileForm.countryControl.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((value) => {
        switch (value) {
          case CountryCode.US:
            this.translateService.setCurrentLanguage(Language.EN);
            break;
          case CountryCode.CL:
            this.translateService.setCurrentLanguage(Language.ES);
            break;
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
