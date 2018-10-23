import {Routes} from '@angular/router';
import {ContentManagementComponent} from './content/content-management/content-management.component';

export const ROUTES: Routes = [
  {path: '**', component: ContentManagementComponent, pathMatch: 'full'}
];
