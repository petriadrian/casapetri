import {AfterViewInit, Component, Inject, Input, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Meta, Title} from '@angular/platform-browser';
import {UrlService} from '../../url-services/url.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.css']
})
export class ContentManagementComponent implements AfterViewInit {

  public content;

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private metaService: Meta,
              private title: Title,
              private urlService: UrlService,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.activatedRoute.url.subscribe(url => {
        if (urlService.urlRoutePathValid()) {
          this.http.get(urlService.getJsonContentUrl()).subscribe(res => {
            this.content = res;
            this.updateSeoMetadata(this.content);
          }, error => {
            console.log('Error on loading json content ' + error + 'redirect to home');
            if (this.urlService.isHostOnBrowser()) {
              window.location.href = './';
            }
        });
          if (urlService.isHostOnBrowser()) {
            window.scroll(0, 0);
          }
        }
      }
    );
  }

  private updateSeoMetadata(res) {
    this.title.setTitle((res as any).metaData.title);
    this.metaService.updateTag({content: this.urlService.getFullUrl()}, 'property=\'og:url\'');
    this.metaService.updateTag({content: (res as any).metaData.title}, 'property=\'og:title\'');
    this.metaService.updateTag({content: (res as any).metaData.text}, 'property=\'og:description\'');
    this.metaService.updateTag({content: this.urlService.getHostName() + (res as any).metaData.img}, 'property=\'og:image\'');
  }

  ngAfterViewInit(): void {
    if (this.urlService.isHostOnBrowser()) {
      this.activatedRoute.fragment.subscribe((fragment: string) => {
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
