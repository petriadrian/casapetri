import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent {

  @Input() content;

  constructor(public activeModal: NgbActiveModal) {
  }

  onClose() {
    this.activeModal.close('Close click');
    if (document.querySelector('video')) {
      document.querySelector('video').load();
    }
  }
}
