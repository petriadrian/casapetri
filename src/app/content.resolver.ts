import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UrlService} from "./url-services/url.service";
import {HttpClient} from "@angular/common/http";
import {Meta, Title} from "@angular/platform-browser";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class ContentResolver implements Resolve<any> {

  constructor(
    public  urlService: UrlService,
    public  title: Title,
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
    console.log("metadata " + metadata);
    this.title.setTitle((metadata as any).title);
    this.meta.addTags([
      {name: 'og:title', content: (metadata as any).title},
      {name: 'url', content: this.urlService.getFullUrl()},
      {name: 'img', content: (metadata as any).img},
      {name: 'description', content: (metadata as any).text}
    ]);
    this.meta.updateTag({name: 'description', content: 'Angular 4 meta service - updated'});
    // this.meta.updateTag({content: this.urlService.getFullUrl()}, 'property=\'og:url\'');
    // this.meta.updateTag({content: (metadata as any).title}, 'property=\'og:title\'');
    // this.meta.updateTag({content: (metadata as any).text}, 'property=\'og:description\'');
    // this.meta.updateTag({content: this.urlService.getHostName() + (metadata as any).img}, 'property=\'og:image\'');
  }

  private initGoogleAnalytics(url) {
    console.log('google analytics sent: ' + url);
    if (this.urlService.isHostOnBrowser()) {
      (<any>window).ga('set', 'page', url);
      (<any>window).ga('send', 'pageview');
    }
  }
}
