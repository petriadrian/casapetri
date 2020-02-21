import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UrlService} from "./url-services/url.service";
import {HttpClient} from "@angular/common/http";
import {Meta, Title} from "@angular/platform-browser";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class ContentResolver implements Resolve<any> {

  constructor(
    public urlService: UrlService,
    public title: Title,
    public meta: Meta,
    public http: HttpClient
  ) {
  }

  public resolve(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): Observable<any> {
    if (this.urlService.urlRoutePathValid()) {
      this.initGoogleAnalytics(router.url);
      return this.http.get(this.urlService.sanitizeContentUrl(router.url))
        .pipe(map((res: any) => {
          this.updateSeoMetadata((res as any).metaData);
          return (res as any).sections;
        }))
        .pipe(catchError(err => {
            console.log('Error while tring to load content ', err);
            return of("[{'type': 'article', 'text':'Content not found'}]");
          }));
    }
  }

  private updateSeoMetadata(metadata) {
    this.title.setTitle((metadata as any).title);
    this.meta.updateTag({property: 'og:description', content: (metadata as any).text});
    this.meta.updateTag({property: 'description', content: (metadata as any).text});
    this.meta.updateTag({property: 'og:title', content: (metadata as any).title});
    this.meta.updateTag({property: 'title', content: (metadata as any).title});
    this.meta.updateTag({property: 'og:img', content: (metadata as any).img});
    this.meta.updateTag({property: 'img', content: (metadata as any).img});
    this.meta.updateTag({property: 'og:url', content: window.location.href});
    this.meta.updateTag({property: 'url', content: window.location.href});
  }

  private initGoogleAnalytics(url) {
    console.log('google analytics sent: ' + url);
    if (this.urlService.isHostOnBrowser()) {
      (<any>window).ga('set', 'page', url);
      (<any>window).ga('send', 'pageview');
    }
  }
}
