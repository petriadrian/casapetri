import {Inject, Injectable, Injector, Optional, PLATFORM_ID} from '@angular/core';
import {isPlatformServer} from '@angular/common';
import {Router} from '@angular/router';

@Injectable()
export class UrlService {

  public RO_LOCALE = 'ro';
  public EN_LOCALE = 'en';

  public constructor(private router: Router,
                     private injector: Injector,
                     @Inject(PLATFORM_ID) private platformId: Object) {
  }

  public getCurrentLang() {
    const url = isPlatformServer(PLATFORM_ID) ? this.injector.get('request').url : location.pathname;
    if ((url.includes('/' + this.RO_LOCALE + '/')) || (url === '/')) {
      return this.RO_LOCALE;
    } else {
      return this.EN_LOCALE;
    }
  }

  public open(link) {
    if (link && link !== "") {
      if (link === this.RO_LOCALE || link === this.EN_LOCALE) {
        this.buildLangLinkAndGo(link);
      }
      if (link.startsWith('http') || link.startsWith('mailto') || link.startsWith('tel')) {
        window.open(link, '_blank');
      } else {
        if (link.includes('#')) {
          const hash = link.substring(link.indexOf('#') + 1);
          const linkNoHash = link.substring(0, link.indexOf('#'));
          this.router.navigate([linkNoHash], {fragment: hash});
        } else {
          this.router.navigate([link]);
        }
      }
    }
  }

  public buildLangLinkAndGo(newLang) {
    const currentPathWithoutLang = location.pathname.substring(3);
    if (!currentPathWithoutLang && newLang === this.RO_LOCALE) {
      location.pathname = '/';
    } else if (!currentPathWithoutLang && newLang !== this.RO_LOCALE) {
      location.pathname = '/' + newLang;
    } else {
      location.pathname = newLang + currentPathWithoutLang;
    }
  }

  public notEmpty(input: string) {
    return input !== null
      && input !== 'null'
      && input !== '/null'
      && input !== ''
      && input !== undefined;
  }

}
