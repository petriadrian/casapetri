import {Component, Input} from '@angular/core';
import {UrlService} from '../../../../url-services/url.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  @Input() content;

  constructor(private changeUrlService: UrlService) {
  }

  public buildLinkAndGo(link) {
    this.changeUrlService.open(link);
  }

}
