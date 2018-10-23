import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-section-management',
  templateUrl: './section-management.component.html',
  styleUrls: ['./section-management.component.css']
})
export class SectionManagementComponent implements OnInit {

  @Input() content;

  constructor() {
  }

  ngOnInit() {
  }

}
