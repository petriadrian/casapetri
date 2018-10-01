import {BrowserModule} from '@angular/platform-browser';
import {APP_ID, Inject, NgModule, PLATFORM_ID} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent, RemoveHtmlFromText, SafeUrl, TrustHtml} from './app.component';
import {HeaderWebSiteComponent} from './header-web-site/header-web-site.component';
import {FooterWebSiteComponent} from './footer-web-site/footer-web-site.component';
import {FormComponent} from './body/section/form/form.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.router';
import {UrlService} from './url-services/url.service';
import {ArticleTitleComponent} from './body/section/article-title/article-title.component';
import {ArticleComponent} from './body/section/article/article.component';
import {LinkDetailBoxComponent} from './body/section/link-detail-box/link-detail-box.component';
import {CarouselComponent} from './body/section/carousel/carousel.component';
import {HeadlineComponent} from './body/section/headline/headline.component';
import {SectionManagementComponent} from './body/section-management/section-management.component';
import {ArticleBodyComponent} from './body/section/article/article-body/article-body.component';
import {CommonArticleComponent} from './body/section/article/common-article/common-article.component';
import {LinkComponent} from './body/section/link/link.component';
import {SocialButtonsComponent} from './body/section/social-buttons/social-buttons.component';
import {LinkDetailBoxBigComponent} from './body/section/link-detail-box-big/link-detail-box-big.component';
import {InfoModalComponent} from './info-modal/info-modal.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { isPlatformBrowser } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SafeUrl,
    TrustHtml,
    RemoveHtmlFromText,
    HeaderWebSiteComponent,
    FooterWebSiteComponent,
    FormComponent,
    ArticleTitleComponent,
    ArticleComponent,
    LinkDetailBoxComponent,
    CarouselComponent,
    HeadlineComponent,
    SectionManagementComponent,
    ArticleBodyComponent,
    CommonArticleComponent,
    LinkComponent,
    SocialButtonsComponent,
    LinkDetailBoxBigComponent,
    InfoModalComponent
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
