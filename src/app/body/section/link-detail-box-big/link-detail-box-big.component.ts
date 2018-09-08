import {Component, Input} from '@angular/core';
import {UrlService} from '../../../url-services/url.service';

@Component({
  selector: 'app-link-detail-box-big',
  templateUrl: './link-detail-box-big.component.html',
  styleUrls: ['./link-detail-box-big.component.css']
})
export class LinkDetailBoxBigComponent {

  @Input() content;

  constructor(private changeUrlService: UrlService) {
  }

  public buildLinkAndGo(link) {
    this.changeUrlService.buildLinkAndGo(link);
  }
}
