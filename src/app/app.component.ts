import {Component, HostListener, OnInit, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {UrlService} from './url-services/url.service';
import * as $ from 'jquery';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private urlService: UrlService, private router: Router) {
    // google analytics
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // console.log('google analytics sent: ' + event.urlAfterRedirects);
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  public onScrollEvent($event) {
    if (this.urlService.isHostOnBrowser()) {
      if (window.pageYOffset > 300) {
        $('#stickHeaderBarOnTheTop').fadeIn(200);
        $('#stickPageIntroMenuOnTheTop').addClass('showPageIntroBar').fadeIn();
      } else {
        $('#stickHeaderBarOnTheTop').fadeOut();
        $('#stickPageIntroMenuOnTheTop').removeClass('showPageIntroBar');
      }
    }
  }

}

@Pipe({name: 'safeUrl'})
export class SafeUrl implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Pipe({name: 'trustHtml'})
export class TrustHtml implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {
  }

  transform(v: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}

@Pipe({name: 'removeHtmlFromText'})
export class RemoveHtmlFromText implements PipeTransform {
  constructor() {
  }

  transform(text) {
    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  }
}


