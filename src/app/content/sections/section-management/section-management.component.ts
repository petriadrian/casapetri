import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-section-management',
  templateUrl: './section-management.component.html',
  styleUrls: ['./section-management.component.css']
})
export class SectionManagementComponent {

  @Input() content;

  constructor() {
  }

}
