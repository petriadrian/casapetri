import {Component, Input} from '@angular/core';
import {UrlService} from '../../../url-services/url.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent {

  @Input() content;
  @Input() class: string;

  constructor(private changeUrlService: UrlService) {
  }

  public buildLinkAndGo(link) {
    this.changeUrlService.buildLinkAndGo(link);
  }

}
