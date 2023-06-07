import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ReactiveProfileForm } from './helpers/reactive-profile-form.form';
import { ReactiveProfileFormBusinessLogicService } from './helpers/reactive-profie-form.business-logic';

@Component({
  selector: 'app-reactive-profile-form',
  templateUrl: './reactive-profile-form.component.html',
  styleUrls: ['./reactive-profile-form.component.scss'],
  providers: [ReactiveProfileFormBusinessLogicService],
})
export class ReactiveProfileFormComponent implements OnDestroy, OnInit {
  private _destroy$ = new Subject<void>();
  readonly profileForm = new ReactiveProfileForm();

  constructor(
    private reactiveProfileFormBusinessLogicService: ReactiveProfileFormBusinessLogicService
  ) {}

  ngOnInit(): void {
    this.reactiveProfileFormBusinessLogicService
      .applyBusinessLogic(this.profileForm)
      .pipe(takeUntil(this._destroy$))
      .subscribe();
    this.profileForm.addInterest();
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
