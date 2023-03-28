import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { startWith, Subscription } from 'rxjs';
import { TranslateService } from './translate.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private subscription = Subscription.EMPTY;
  private value = '';

  constructor(
    private translate: TranslateService,
    private cd: ChangeDetectorRef
  ) {}

  transform(key: string): string {
    if (!this.value) {
      this.value = this.translate.instant(key);
      this.cd.markForCheck();

      this.subscription = this.translate.changeLanguage$
        .pipe(startWith(''))
        .subscribe(() => {
          this.value = this.translate.instant(key);
          this.cd.markForCheck();
        });
    }

    return this.value;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
