import {Routes} from '@angular/router';
import {ContentManagementComponent} from './content/content-management/content-management.component';
import {ContentResolver} from "./content.resolver";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

export const ROUTES: Routes = [
  {
    path: '404', component: PageNotFoundComponent
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
