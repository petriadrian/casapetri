import {Component, Input, OnInit} from '@angular/core';
import {UrlService} from "../../../../url-services/url.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {

  @Input() content;

  constructor(private urlService: UrlService) {
  }

  public open(link) {
    this.urlService.open(link);
  }

}
