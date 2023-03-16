import {
  ChangeDetectorRef,
  OnDestroy,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from './translate.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private subscription = Subscription.EMPTY;
  private value?: string;

  constructor(
    private translate: TranslateService,
    private cd: ChangeDetectorRef
  ) {}

  transform(key: string): unknown {
    if (!this.value) {
      this.value = this.translate.instant(key);
      this.cd.markForCheck();

      this.subscription = this.translate.currentLanguageFile$.subscribe(
        (file) => {
          this.value = this.translate.instant(key);
          this.cd.markForCheck();
        }
      );
    }

    return this.value;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
