import {Component, Input} from '@angular/core';
import {UrlService} from '../../../url-services/url.service';

@Component({
  selector: 'app-link-detail-box',
  templateUrl: './link-detail-box.component.html',
  styleUrls: ['./link-detail-box.component.css']
})
export class LinkDetailBoxComponent {

  @Input() content;

  constructor(private changeUrlService: UrlService) {
  }

  public buildLinkAndGo(link) {
    this.changeUrlService.buildLinkAndGo(link);
  }

}
