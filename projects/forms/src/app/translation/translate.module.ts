import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from './translate.service';
import { TranslatePipe } from './translate.pipe';

export const TRANSLATION_TOKEN = new InjectionToken('TRANSLATION_TOKEN');

export interface TranslationConfig {
  currentLanguage: string;
  defaultLanguage: string;
  initialLoadLanguages?: string[];
}

@NgModule({
  imports: [CommonModule, TranslatePipe],
  exports: [TranslatePipe],
})
export class TranslateModule {
  static forRoot(config: TranslationConfig) {
    return {
      ngModule: TranslateModule,
      providers: [
        TranslateService,
        {
          provide: TRANSLATION_TOKEN,
          useValue: config,
        },
        {
          provide: APP_INITIALIZER,
          useFactory:
            (translateService: TranslateService) => (): Promise<boolean[]> => {
              const loadLanguages = (): Promise<boolean> => {
                if (!Array.isArray(config.initialLoadLanguages)) {
                  return Promise.resolve(true);
                }

                const promises = config.initialLoadLanguages.map((language) => {
                  return translateService.loadTranslations(language);
                });
                return Promise.all(promises).then(() => true);
              };

              translateService.setDefaultLanguage(config.defaultLanguage);
              return Promise.all([
                translateService.setCurrentLanguage(config.currentLanguage),
                loadLanguages(),
              ]);
            },
          multi: true,
          deps: [TranslateService],
        },
      ],
    };
  }
}
