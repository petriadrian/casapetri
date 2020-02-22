import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../../url-services/url.service';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.css']
})
export class ContentManagementComponent {

  public content;

  constructor(private http: HttpClient,
              private urlService: UrlService,
              private route: ActivatedRoute) {
    route.data.subscribe(data => {
      this.content = data.content;
    });
  }

  ngAfterViewInit() {
    // hack to display text when opening a photo album
    $('.fancybox').each(function (i, obj) {
      $(this).attr('data-caption', $(this).attr('title'));
    });
  }
}
