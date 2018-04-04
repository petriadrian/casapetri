import {Routes} from '@angular/router';
import {SectionManagementComponent} from './body/section-management/section-management.component';

export const ROUTES: Routes = [
  {path: '**', component: SectionManagementComponent, pathMatch: 'full'}
];
