import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  showResponse = false;
  responseMessage = '';
  messageType = 'success';
  formLoading = false;

  @Input() classResponsive;
  @Input() content;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
  }

  addNewField(collectionWhereToAdd, fieldToBeAdded) {
    const newSelectField = {...fieldToBeAdded};
    newSelectField.name = fieldToBeAdded.name + collectionWhereToAdd.length;
    collectionWhereToAdd.push(newSelectField);
  }

  removeLastField(collectionToRemoveFrom) {
    const lastItem = collectionToRemoveFrom.length - 1;
    collectionToRemoveFrom.splice(lastItem);
  }

  sendEmailFromForm(form: NgForm) {
    form.value.pageUrl = this.router.url;
    this.formLoading = true;
    this.responseMessage = '';
    this.showResponse = false;
    this.http.post('./assets/send_mail.php', form.value)
      .subscribe(
        res => {
          this.messageType = 'success';
          this.responseMessage = this.content.successMessage || this.messageType;
          this.commonMailCallback(form);
        },
        err => {
          this.messageType = 'error';
          this.responseMessage = this.content.errorMessage || this.messageType;
          this.commonMailCallback(form);
        }
      );
  }

  private commonMailCallback(form: NgForm) {
    this.showResponse = true;
    this.formLoading = false;
    form.reset();
    // setTimeout(() => {
    //   this.showResponse = false;
    // }, 30000);
  }
}
