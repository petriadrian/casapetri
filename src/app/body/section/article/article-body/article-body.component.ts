///<reference path="../../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {UrlService} from '../../../../url-services/url.service';

@Component({
  selector: 'app-article-body',
  templateUrl: './article-body.component.html',
  styleUrls: ['./article-body.component.css']
})
export class ArticleBodyComponent implements OnInit, AfterViewInit {

  @Input() content;

  constructor(private urlService: UrlService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.urlService.isHostOnBrowser()) {
      // hack to display text when opening a photo album
      $('.fancybox').each(function (i, obj) {
        $(this).attr('data-caption', $(this).attr('title'));
      });
    }
  }
}
