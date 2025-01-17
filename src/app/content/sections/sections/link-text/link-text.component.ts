import {Component, Input} from '@angular/core';
import {UrlService} from '../../../../url-services/url.service';

@Component({
  selector: 'app-link-text',
  templateUrl: './link-text.component.html',
  styleUrls: ['./link-text.component.css']
})
export class LinkTextComponent {

  @Input() content;
  @Input() cssClass: string;
  @Input() classCollection: string;

  constructor(private urlService: UrlService) {
  }

  public isArray(obj: any ) {
    return Array.isArray(obj);
  }

  public open(link) {
    this.urlService.open(link);
  }

}
