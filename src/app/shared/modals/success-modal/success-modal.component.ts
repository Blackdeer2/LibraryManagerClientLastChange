import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.css'
})
export class SuccessModalComponent implements OnInit {
  modalHeaderText: string | undefined;
  modalBodyText: string | undefined;
  okButtonText: string | undefined;
  redirectOnOk: EventEmitter<any> = new EventEmitter();
  constructor(private bsModalRef: BsModalRef) { }
  ngOnInit(): void {
  }
  onOkClicked = () => {
    this.redirectOnOk.emit();
    this.bsModalRef.hide();
  }
}
