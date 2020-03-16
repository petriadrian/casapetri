import {BrowserModule} from '@angular/platform-browser';
import {APP_ID, Inject, NgModule, PLATFORM_ID} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent, RemoveHtmlFromText, TrustHtml} from './app.component';
import {HeaderWebSiteComponent} from './header-web-site/header-web-site.component';
import {FooterWebSiteComponent} from './footer-web-site/footer-web-site.component';
import {FormsModule} from '@angular/forms';
import {routing} from './app.router';
import {UrlService} from './url-services/url.service';
import {InfoModalComponent} from './info-modal/info-modal.component';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {isPlatformBrowser} from '@angular/common';
import {FormComponent} from './content/sections/sections/form/form.component';
import {CardsComponent} from './content/sections/sections/cards/cards.component';
import {CarouselComponent} from './content/sections/sections/carousel/carousel.component';
import {LinkTextComponent} from './content/sections/sections/link-text/link-text.component';
import {IframeComponent} from './content/sections/sections/iframe/iframe.component';
import {ArticleComponent} from './content/sections/sections/article/article.component';
import {ImagesComponent} from './content/sections/sections/images/images.component';
import {ContentManagementComponent} from './content/content-management/content-management.component';
import {ContentResolver} from "./content.resolver";
import {SectionManagementComponent} from "./content/sections/section-management/section-management.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { RedirectComponent } from './redirect/redirect.component';


@NgModule({
  declarations: [
    AppComponent,
    SectionManagementComponent,
    ArticleComponent,
    PageNotFoundComponent,
    TrustHtml,
    RemoveHtmlFromText,
    HeaderWebSiteComponent,
    FooterWebSiteComponent,
    FormComponent,
    CardsComponent,
    CarouselComponent,
    LinkTextComponent,
    InfoModalComponent,
    ImagesComponent,
    IframeComponent,
    ContentManagementComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'casapetri'}),
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    routing,
    HttpClientModule
  ],
  providers: [UrlService, NgbActiveModal, ContentResolver],
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
