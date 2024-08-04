import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.css'
})
export class ErrorModalComponent implements OnInit {
  modalHeaderText: string | undefined;
  modalBodyText: string | undefined;
  okButtonText: string | undefined;
  constructor(public bsModalRef: BsModalRef) { }
  ngOnInit(): void {
  }
}