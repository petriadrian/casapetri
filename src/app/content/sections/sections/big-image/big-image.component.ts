import {Component, Input} from '@angular/core';
import {UrlService} from '../../../../url-services/url.service';

@Component({
  selector: 'app-big-image',
  templateUrl: './big-image.component.html',
  styleUrls: ['./big-image.component.css']
})
export class BigImageComponent {

  @Input() content;

  constructor(private changeUrlService: UrlService) {
  }

  public buildLinkAndGo(link) {
    this.changeUrlService.buildLinkAndGo(link);
  }
}
