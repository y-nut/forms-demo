import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { distinctUntilChanged, firstValueFrom, Subject, takeUntil } from 'rxjs';
import { get, has } from 'lodash';

interface TranslationFile {
  locale: string;
  translations: Record<string, string>;
}

@Injectable()
export class TranslateService implements OnDestroy {
  private _destroy$ = new Subject<void>();
  private _languageFile: Record<string, Record<string, string>> = {};
  private _currentLanguage = 'en';
  private _defaultLanguage = 'en';
  private _changeLanguage$ = new Subject<string>();
  readonly changeLanguage$ = this._changeLanguage$
    .asObservable()
    .pipe(distinctUntilChanged());
  private _currentLanguageFile$ = new Subject<Record<string, string>>();
  readonly currentLanguageFile$ = this._currentLanguageFile$
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(private http: HttpClient) {
    this.changeLanguage$.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this._currentLanguageFile$.next(
        this._languageFile[this._currentLanguage]
      );
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  setDefaultLanguage(language: string): void {
    this._defaultLanguage = language;
  }

  setCurrentLanguage(language: string): Promise<boolean> {
    this._currentLanguage = language;
    return this.loadTranslations(language).then((loaded) => {
      this._changeLanguage$.next(language);
      return loaded;
    });
  }

  instant(key: string): string {
    if (this._currentLanguage in this._languageFile) {
      if (has(this._languageFile[this._currentLanguage], key)) {
        return get(this._languageFile[this._currentLanguage], key) ?? '';
      }
    }
    if (this._defaultLanguage in this._languageFile) {
      if (has(this._languageFile[this._defaultLanguage], key)) {
        return get(this._languageFile[this._defaultLanguage], key) ?? '';
      }
    }

    return '';
  }

  private loadTranslations(language: string): Promise<boolean> {
    if (language in this._languageFile) {
      return Promise.resolve(true);
    }
    const url = `assets/locale/messages.${language}.json`;
    return firstValueFrom(this.http.get<TranslationFile>(url))
      .then((data: TranslationFile) => {
        this._languageFile[language] = data.translations;
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
}
