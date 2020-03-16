import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {ContentManagementComponent} from './content/content-management/content-management.component';
import {ContentResolver} from "./content.resolver";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ModuleWithProviders} from "@angular/core";
import {RedirectComponent} from "./redirect/redirect.component";

export const ROUTES: Routes = [
  {
    path: '404', component: PageNotFoundComponent
  },
  {
    path: 'redirect/:to', component: RedirectComponent
  },
  {
    path: '**',
    component: ContentManagementComponent,
    pathMatch: 'full',
    resolve: {
      content: ContentResolver
    }
  }
];

const extraOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload',
  enableTracing: false, // to display logs add {enableTracing: true}
  useHash: false, // you could navigate with fragments if 'true' but it is ugly that ads # in url
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled'
};

export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES, extraOptions);

