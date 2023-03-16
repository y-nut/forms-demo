import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ReactiveProfileForm } from './helpers/reactive-profile-form.form';
import { ReactiveProfileFormBusinessLogic } from './helpers/reactive-profie-form.business-logic';
import { CountryCode } from '../shared/enums/country-code.enum';

@Component({
  selector: 'app-reactive-profile-form',
  templateUrl: './reactive-profile-form.component.html',
  styleUrls: ['./reactive-profile-form.component.scss'],
})
export class ReactiveProfileFormComponent implements OnDestroy, OnInit {
  private _destroy$ = new Subject<void>();
  profileForm!: ReactiveProfileForm;
  CountryCode = CountryCode;

  ngOnInit(): void {
    this.profileForm = new ReactiveProfileForm();
    ReactiveProfileFormBusinessLogic.applyBusinessLogic(
      this.profileForm,
      this._destroy$
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
