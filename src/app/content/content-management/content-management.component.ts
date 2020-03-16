import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../../url-services/url.service';
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {isPlatformServer} from "@angular/common";
import {Meta, Title} from "@angular/platform-browser";

@Component({
    selector: 'app-content-management',
    templateUrl: './content-management.component.html',
    styleUrls: ['./content-management.component.css']
})
export class ContentManagementComponent {

    public content: [];

    constructor(private http: HttpClient,
                private urlService: UrlService,
                private route: ActivatedRoute,
                public meta: Meta,
                public title: Title,
                @Inject(PLATFORM_ID) private platformId: Object,
                private router: Router) {
        if (this.urlRoutePathValid(router.url)) {
            this.initGoogleAnalytics(router.url);
            this.route.fragment.subscribe((fragment: string) => {
              this.scrollToAnchor(fragment);
            });
            this.http.get(this.getJsonContentPathFromUrl(router.url))
                .pipe(catchError(err => {
                    this.router.navigate(['404']);
                    return of();
                })).subscribe((res: any) => {
                    this.updateSeoMetadata(res.metaData, router.url);
                    this.content = res.sections;
                });
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
          console.log("Scroll to anchor => ", anchor);
          setTimeout(_ => {
                if (anchor.includes('?')) {
                    anchor = anchor.substring(0, anchor.indexOf('?'));
                }
                // document.querySelector('#' + anchor).scrollIntoView();
                const element = document.querySelector('#' + anchor);
                if (element) {
                    element.scrollIntoView();
                }
            }, 1000);
        }
    }

    private updateSeoMetadata(metaData: any, url: string) {
        this.title.setTitle(metaData.title);
        this.meta.updateTag({property: "og:description", content: metaData.text});
        this.meta.updateTag({property: "og:title", content: metaData.title});
        this.meta.updateTag({property: "og:image", content: metaData.img});
        this.meta.updateTag({property: "og:url", content: url});
    }

}
