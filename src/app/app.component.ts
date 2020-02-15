import {AfterViewInit, Component, ElementRef, HostListener, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {DomSanitizer, Meta, SafeHtml, Title} from '@angular/platform-browser';
import {UrlService} from './url-services/url.service';
import * as $ from 'jquery';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {InfoModalComponent} from './info-modal/info-modal.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private urlService: UrlService,
              private http: HttpClient,
              private modalService: NgbModal) {
    this.initConfigSettings();
    this.displayPrivacyPolicyModal();
  }

  private initConfigSettings() {
    this.http.get(this.urlService.getHostNameContent() + 'config.json').subscribe(res => {
      document.documentElement.style.setProperty('--firstColor', (res as any).firstColor);
      document.documentElement.style.setProperty('--secondColor', (res as any).secondColor);
    });
  }

  private displayPrivacyPolicyModal() {
    const privacyPolicyPath = './assets/content/' + this.urlService.getCurrentLang()
      + '/common/privacyPolicy.json';
    this.http.get(privacyPolicyPath).subscribe(result => {
      this.modalService.open(InfoModalComponent, {
        backdrop: 'static',
        keyboard: false
      }).componentInstance.content = result;
    });
  }

  @HostListener('window:scroll', ['$event'])
  public onScrollEvent($event) {
    if (this.urlService.isHostOnBrowser()) {
      if (window.pageYOffset > 300) {
        $('#stickHeaderBarOnTheTop').fadeIn(200);
      } else {
        $('#stickHeaderBarOnTheTop').fadeOut();
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


