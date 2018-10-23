import {BrowserModule} from '@angular/platform-browser';
import {APP_ID, Inject, NgModule, PLATFORM_ID} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent, RemoveHtmlFromText, SafeUrl, TrustHtml} from './app.component';
import {HeaderWebSiteComponent} from './header-web-site/header-web-site.component';
import {FooterWebSiteComponent} from './footer-web-site/footer-web-site.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.router';
import {UrlService} from './url-services/url.service';
import {InfoModalComponent} from './info-modal/info-modal.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { isPlatformBrowser } from '@angular/common';
import {FormComponent} from './content/sections/sections/form/form.component';
import {LinkImageTextComponent} from './content/sections/sections/link-image-text/link-image-text.component';
import {CommonItemComponent} from './content/sections/sections/common-item/common-item.component';
import {SectionManagementComponent} from './content/sections/section-management/section-management.component';
import {CarouselComponent} from './content/sections/sections/carousel/carousel.component';
import {LinkTextComponent} from './content/sections/sections/link-text/link-text.component';
import {LinkImageBigTextComponent} from './content/sections/sections/link-image-big-text/link-image-big-text.component';
import {IframeComponent} from './content/sections/sections/iframe/iframe.component';
import {ArticleComponent} from './content/sections/sections/article/article/article.component';
import {HeadingComponent} from './content/sections/sections/article/elements/heading/heading.component';
import {ImagesComponent} from './content/sections/sections/images/images.component';
import {ImageVideoTextButtonsComponent} from './content/sections/sections/image-video-text-buttons/image-video-text-buttons.component';
import {ContentManagementComponent} from './content/content-management/content-management.component';
import {ContentComponent} from './content/sections/sections/article/elements/content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    SafeUrl,
    ArticleComponent,
    HeadingComponent,
    TrustHtml,
    RemoveHtmlFromText,
    HeaderWebSiteComponent,
    FooterWebSiteComponent,
    FormComponent,
    LinkImageTextComponent,
    CarouselComponent,
    ImageVideoTextButtonsComponent,
    SectionManagementComponent,
    CommonItemComponent,
    LinkTextComponent,
    LinkImageBigTextComponent,
    InfoModalComponent,
    HeadingComponent,
    ContentComponent,
    ImagesComponent,
    IframeComponent,
    ContentManagementComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'casapetri'}),
    FormsModule,
    NgbModule,
    RouterModule.forRoot(ROUTES), // to display logs add {enableTracing: true} as 2nd param,
    HttpClientModule
  ],
  providers: [UrlService, NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [
    InfoModalComponent
  ]
})
export class AppModule {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
