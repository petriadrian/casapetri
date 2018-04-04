import {Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {

  @Input() content;

  constructor() { }

  ngOnInit() {}

  scrollTo(divId) {
    document.querySelector('#' + divId).scrollIntoView();
  }


}
