import {AfterViewInit, Component, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UrlService} from '../../url-services/url.service';


@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.css']
})
export class ContentManagementComponent implements AfterViewInit {

  @Input() content;

  constructor(private http: HttpClient,
              private urlService: UrlService,
              private route: ActivatedRoute) {
    if (!this.content) {
      route.data.subscribe(data => {
        this.content = data.content;
      })
    }
  }

  ngAfterViewInit(): void {
    console.log("run afterviewinit from ContentManagementComponent ");
    if (this.urlService.isHostOnBrowser()) {
      this.route.fragment.subscribe((fragment: string) => {
          this.urlService.scrollToAnchorIfValid(fragment);
        }
      );
      // hack to display text when opening a photo album
      $('.fancybox').each(function (i, obj) {
        $(this).attr('data-caption', $(this).attr('title'));
      });
    }
  }

}
