import {AfterViewInit, Component, Inject, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Meta, Title} from '@angular/platform-browser';
import {UrlService} from '../../url-services/url.service';

@Component({
  selector: 'app-section-management',
  templateUrl: './section-management.component.html',
  styleUrls: ['./section-management.component.css']
})
export class SectionManagementComponent implements AfterViewInit {

  public pageContent;

  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute,
              private metaService: Meta,
              private title: Title,
              private urlService: UrlService,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.activatedRoute.url.subscribe(url => {
        if (urlService.urlRoutePathValid()) {
          this.http.get(urlService.getJsonContentUrl()).subscribe(res => {
            this.pageContent = res;
            this.updateSeoMetadata(this.pageContent);
          }, error => console.log('Error on loading json content ' + error));
          if (urlService.isHostOnBrowser()) {
            window.scroll(0, 0);
          }
        }
      }
    );
  }

  private updateSeoMetadata(res) {
    this.title.setTitle((res as any).metaData.title);
    this.metaService.updateTag({content: 'www.casaPetriRosiaMontana.ro' + this.urlService.getRouterUrl()}, 'property=\'og:url\'');
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
    }
  }

}
