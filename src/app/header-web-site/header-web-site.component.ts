import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../url-services/url.service';

@Component({
  selector: 'app-header-web-site',
  templateUrl: './header-web-site.component.html',
  styleUrls: ['./header-web-site.component.css'],
  providers: [UrlService]
})
export class HeaderWebSiteComponent implements OnInit {

  public content;

  constructor(private http: HttpClient, private urlService: UrlService) {
  }

  ngOnInit() {
    const contentPath = './assets/content/' + this.urlService.getCurrentLang() + '/header.json';
    this.http.get(contentPath).subscribe(res => this.content = res);
  }

  public buildLinkAndGo(link) {
    this.urlService.buildLinkAndGo(link);
  }

}
