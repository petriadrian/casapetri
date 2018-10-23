import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  @Input() content;

  constructor() {
  }

  ngOnInit() {
  }

}
