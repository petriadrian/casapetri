import {Component, HostListener, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {UrlService} from './url-services/url.service';
import * as $ from 'jquery';
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
    this.http.get('./assets/content/config.json').subscribe((res: any) => {
      this.updateCss(res);
    });
  }

  private updateCss(res: any) {
    document.documentElement.style.setProperty('--firstColor', res.firstColor);
    document.documentElement.style.setProperty('--secondColor', res.secondColor);
}

  private displayPrivacyPolicyModal() {
    const privacyPolicyPath = './assets/content/' + this.urlService.getCurrentLang()
      + '/privacyPolicy.json';
    this.http.get(privacyPolicyPath).subscribe(result => {
      this.modalService.open(InfoModalComponent, {
        backdrop: 'static',
        keyboard: false
      }).componentInstance.content = result;
    });
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


