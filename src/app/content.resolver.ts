import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {UrlService} from "./url-services/url.service";
import {HttpClient} from "@angular/common/http";
import {Meta, Title} from "@angular/platform-browser";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {isPlatformServer} from "@angular/common";

@Injectable()
export class ContentResolver implements Resolve<any> {

  constructor(
    public urlService: UrlService,
    public title: Title,
    public meta: Meta,
    public http: HttpClient,
    public mainRouter: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): Observable<any> {
    if (this.urlRoutePathValid(router.url)) {
      this.initGoogleAnalytics(router.url);
      setTimeout(_ => this.scrollToAnchor(route.fragment), 1000);
      return this.http.get(this.getJsonContentPathFromUrl(router.url))
        .pipe(map((res: any) => {
          this.updateSeoMetadata((res as any).metaData);
          return (res as any).sections;
        }))
        .pipe(catchError(err => {
          console.log('Error while tring to load content ', err);
          this.mainRouter.navigate(['404']);
          return of();
        }));
    }
  }

  public urlRoutePathValid(url: string) {
    return this.urlService.notEmpty(url) && !url.includes('.json');
  }

  public getJsonContentPathFromUrl(url) {
    let jsonPath = url;
    if (url === '/') {
      jsonPath = '/ro/home';
    }
    if (url === '/en') {
      jsonPath = '/en/home';
    }
    if (url.includes("?")) {
      jsonPath = url.substring(0, url.indexOf('?'));
    }
    if (url.includes("#")) {
      jsonPath = url.substring(0, url.indexOf('#'));
    }
    return './assets/content' + jsonPath + '.json';
  }

  private initGoogleAnalytics(url) {
    if (isPlatformServer(this.platformId)) {
      (<any>window).ga('set', 'page', url);
      (<any>window).ga('send', 'pageview');
    }
  }

  public scrollToAnchor(anchor: string) {
    if (anchor) {
      if (anchor.includes('?')) {
        anchor = anchor.substring(0, anchor.indexOf('?'));
      }
      // document.querySelector('#' + anchor).scrollIntoView();
      const element = document.querySelector('#' + anchor);
      if (element) {
        element.scrollIntoView();
      }
    }
  }

  private updateSeoMetadata(metadata) {
    this.title.setTitle((metadata as any).title);
    this.meta.updateTag({property: 'og:description', content: (metadata as any).text});
    this.meta.updateTag({property: 'description', content: (metadata as any).text});
    this.meta.updateTag({property: 'og:title', content: (metadata as any).title});
    this.meta.updateTag({property: 'title', content: (metadata as any).title});
    this.meta.updateTag({property: 'og:image', content: (metadata as any).img});
    this.meta.updateTag({property: 'image', content: (metadata as any).img});
    this.meta.updateTag({property: 'og:url', content: window.location.href});
    this.meta.updateTag({property: 'url', content: window.location.href});
  }

}
