import {Routes} from '@angular/router';
import {ContentManagementComponent} from './content/content-management/content-management.component';
import {ContentResolver} from "./content.resolver";

export const ROUTES: Routes = [
  {
    path: '**',
    component: ContentManagementComponent,
    pathMatch: 'full',
    resolve: {
      content: ContentResolver
    }
  }
];
