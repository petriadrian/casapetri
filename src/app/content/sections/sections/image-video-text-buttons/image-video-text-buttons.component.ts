import {Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-video-text-buttons',
  templateUrl: './image-video-text-buttons.component.html',
  styleUrls: ['./image-video-text-buttons.component.css']
})
export class ImageVideoTextButtonsComponent implements OnInit {

  @Input() content;

  constructor() { }

  ngOnInit() {}

  scrollTo(divId) {
    document.querySelector('#' + divId).scrollIntoView();
  }


}
