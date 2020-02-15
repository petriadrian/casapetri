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
    const url = this.isHostOnBrowser() ? location.pathname : this.injector.get('request').url;
    if ((url.indexOf('/' + this.RO_LOCALE + '/') > -1) || (url === '/')) {
      return this.RO_LOCALE;
    } else {
      return this.EN_LOCALE;
    }
  }

  public buildLinkAndGo(link) {
    if (link && link !== "") {
      if (link === this.RO_LOCALE || link === this.EN_LOCALE) {
        this.buildLangLinkAndGo(link);
      }
      if (link.startsWith('http')) {
        window.open(link, '_blank');
      } else if (link.startsWith('tel:') || link.startsWith('mailto:')) {
        window.open(link, '_self');
      } else {
        if (link.indexOf('#') === -1) {
          this.router.navigate([link]);
        } else {
          const hash = link.substring(link.indexOf('#') + 1);
          const linkNoHash = link.substring(0, link.indexOf('#'));
          this.router.navigate([linkNoHash], {fragment: hash});
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

  public urlRoutePathValid() {
    const valid = this.notEmpty(this.router.url) && !this.contains(this.router.url, '.json');
    // console.log('url: ' + this.router.url + ' routePathValid: ' + valid);
    return valid;
  }

  public sanitizeContentUrl(url) {
    let jsonContentPath = '';
    if (url === '/') {
      jsonContentPath = '/ro/home';
    } else if (url === '/en') {
      jsonContentPath = '/en/home';
    } else {
      if (this.contains(url, '#') || this.contains(url, '?')) {
        if (this.contains(url, '?')) {
          jsonContentPath = url.substring(0, url.indexOf('?'));
        } else if (this.contains(url, '#')) {
          jsonContentPath = url.substring(0, url.indexOf('#'));
        }
      } else {
        jsonContentPath = url;
      }
    }
    const jsonContentUrl = this.getHostNameContent() + jsonContentPath + '.json';
    // console.log('JsonContentUrl: ' + jsonContentUrl);
    return jsonContentUrl;
  }

  public getHostNameContent() {
    return this.getHostName() + '/assets/content/';
  }

  public getHostName() {
    if (this.isHostOnBrowser()) {
      return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
    } else {
      return 'http://' + this.injector.get('request').get('host');
    }
  }

  public isHostOnBrowser(): boolean {
    // console.log('isHostOnBrowser??? : ' + !isPlatformServer(this.platformId));
    return !isPlatformServer(this.platformId);
  }

  public getFullUrl() {
    return this.getHostName() + this.router.url;
  }

  public scrollToAnchorIfValid(anchor) {
    console.log("scroll to anchor " + anchor);
    if (this.notEmpty(anchor)) {
      if (this.contains(anchor, '?')) {
        anchor = anchor.substring(0, anchor.indexOf('?'));
      }
      setTimeout(function () {
        if (document.querySelector('#' + anchor)) {
          document.querySelector('#' + anchor).scrollIntoView();
        }
      }, 1500);
    } else {
      if (this.isHostOnBrowser()) {
        window.scroll(0, 0);
      }
    }
  }

  private notEmpty(input: string) {
    return input !== null
      && input !== 'null'
      && input !== '/null'
      && input !== '' &&
      input !== undefined;
  }

  private contains(fullText: string, section: string) {
    return fullText.indexOf(section) !== -1;
  }

}
