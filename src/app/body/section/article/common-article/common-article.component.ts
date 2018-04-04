import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {UrlService} from '../../../../url-services/url.service';

@Component({
  selector: 'app-common-article',
  templateUrl: './common-article.component.html',
  styleUrls: ['./common-article.component.css']
})
export class CommonArticleComponent implements OnInit {

  @Input() content;
  public commonArticles: any;

  constructor(private http: HttpClient, private languageService: UrlService) {
  }

  ngOnInit() {
    const commonArticlePath = './assets/content/' + this.languageService.getCurrentLang()
      + '/common/articles/' + this.content.category + '.json';
    const neededArticlesIds = [];
    this.content.ids.forEach((item) => {
      neededArticlesIds.push(item.id);
    });
    this.commonArticles = new Array<string>(neededArticlesIds.length);
    // console.log('commonArticlePath: ' + commonArticlePath);
    this.http.get(commonArticlePath).map(res => res).subscribe(result => {
      (result as any).forEach((item, index) => {
        const itemPosition = neededArticlesIds.indexOf(item.id);
        if (itemPosition > -1) {
          this.commonArticles[itemPosition] = item;
        }
      });
    });
  }

}
