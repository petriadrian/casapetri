import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../url-services/url.service';
import {Injectable} from '@angular/core';

@Injectable()
@Component({
  selector: 'app-footer-web-site',
  templateUrl: './footer-web-site.component.html',
  styleUrls: ['./footer-web-site.component.css']
})
export class FooterWebSiteComponent {

  public content;

  constructor(private http: HttpClient, private urlService: UrlService) {
    const footerContentPath = './assets/content/' + this.urlService.getCurrentLang() + '/footer.json';
    this.http.get(footerContentPath).subscribe(res => this.content = (res as any));
  }

}
