import {Component, Input} from '@angular/core';
import {UrlService} from '../../../../url-services/url.service';

@Component({
  selector: 'app-link-image-big-text',
  templateUrl: './link-image-big-text.component.html',
  styleUrls: ['./link-image-big-text.component.css']
})
export class LinkImageBigTextComponent {

  @Input() content;

  constructor(private changeUrlService: UrlService) {
  }

  public buildLinkAndGo(link) {
    this.changeUrlService.buildLinkAndGo(link);
  }
}
