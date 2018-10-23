import {Component, Input} from '@angular/core';
import {UrlService} from '../../../../url-services/url.service';

@Component({
  selector: 'app-link-image-text',
  templateUrl: './link-image-text.component.html',
  styleUrls: ['./link-image-text.component.css']
})
export class LinkImageTextComponent {

  @Input() content;

  constructor(private changeUrlService: UrlService) {
  }

  public buildLinkAndGo(link) {
    this.changeUrlService.buildLinkAndGo(link);
  }

}
