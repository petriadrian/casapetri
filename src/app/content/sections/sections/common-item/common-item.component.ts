import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {UrlService} from '../../../../url-services/url.service';

@Component({
  selector: 'app-common-item',
  templateUrl: './common-item.component.html',
  styleUrls: ['./common-item.component.css']
})
export class CommonItemComponent implements OnInit {

  @Input() content;
  public commonContent;

  constructor(private http: HttpClient, private languageService: UrlService) {
  }

  ngOnInit(): void {
    const commonArticlePath = './assets/content/' + this.languageService.getCurrentLang()
      + '/common/articles/' + this.content.id + '.json';
    this.commonContent = this.http.get(commonArticlePath).map(res => res).subscribe(result => {
      this.commonContent = result;
    });
  }


}
