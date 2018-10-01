import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../url-services/url.service';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
@Component({
  selector: 'app-footer-web-site',
  templateUrl: './footer-web-site.component.html',
  styleUrls: ['./footer-web-site.component.css']
})
export class FooterWebSiteComponent implements OnInit {

  public footerContent;
  public reviews;

  constructor(private http: HttpClient, private changeUrlService: UrlService, @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
    // get footer content
    const footerContentPath = './assets/content/' + this.changeUrlService.getCurrentLang() + '/common/footer.json';
    this.http.get(footerContentPath).subscribe(res => this.footerContent = res);

    // get reviews articles
    const reviewsArticlesPath = './assets/content/' + this.changeUrlService.getCurrentLang() + '/common/articles/reviews.json';
    this.http.get(reviewsArticlesPath).subscribe(res => this.reviews = res);

    // needed to load facebook iframe
    const fjs = this.document.getElementsByTagName('script')[0];
    if (this.document.getElementById('facebook-jssdk')) {
      return;
    }
    const js = this.document.createElement('script');
    js.id = 'facebook-jssdk';
    js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=1018480531572788&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
  }

  public buildLinkAndGo(link) {
    this.changeUrlService.buildLinkAndGo(link);
  }


}
