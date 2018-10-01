import {Component, HostListener, OnInit, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {UrlService} from './url-services/url.service';
import * as $ from 'jquery';
import {NavigationEnd, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InfoModalComponent} from './info-modal/info-modal.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private urlService: UrlService, private router: Router, private http: HttpClient, private modalService: NgbModal) {
    // google analytics
    if (urlService.isHostOnBrowser()) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          // console.log('google analytics sent: ' + event.urlAfterRedirects);
          (<any>window).ga('set', 'page', event.urlAfterRedirects);
          (<any>window).ga('send', 'pageview');
        }
      });
    }
    this.showPrivacyPolicy();
  }

  showPrivacyPolicy(): void {
    const privacyPolicyPath = './assets/content/' + this.urlService.getCurrentLang()
      + '/common/privacyPolicy.json';
    this.http.get(privacyPolicyPath).map(res => res).subscribe(result => {
      this.modalService.open(InfoModalComponent, {backdrop  : 'static'}).componentInstance.content = result;
    });
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


