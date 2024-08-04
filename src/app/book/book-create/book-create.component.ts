import { Component, OnInit } from '@angular/core';
import { BookRepositoryService } from '../../shared/services/book-repository.services';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { DatePipe } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookForCreation } from '../../_interfaces/bookforcreation.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Book } from '../../_interfaces/book.model';
import { SuccessModalComponent } from '../../shared/modals/success-modal/success-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.css'
})
export class BookCreateComponent implements OnInit {
  errorMessage: string = '';
  bookForm!: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private repository: BookRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private datePipe: DatePipe, private modal: BsModalService) { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  validateControl = (controlName: string) => {
    if (this.bookForm.get(controlName)?.invalid && this.bookForm.get(controlName)?.touched)
      return true;
    
    return false;
  } 
  
  hasError = (controlName: string, errorName: string) => {
    if (this.bookForm.get(controlName)?.hasError(errorName))
      return true;
    
    return false;
  }

  createBook = (bookFormValue: any) => {
    if (this.bookForm.valid)
      this.executeBookCreation(bookFormValue);
  }
  private executeBookCreation = (bookFormValue:any) => {
    const book: BookForCreation = {
      title: bookFormValue.name,

    }
    const apiUrl = 'api/book';
    this.repository.createBook(apiUrl, book)
    .subscribe({
      next: (b: Book) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `book: ${b.title} created successfully`,
            okButtonText: 'OK'
          }
        };
  
        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe((_: any) => this.redirectToBookList());
      },
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  
  }
  redirectToBookList = () => {
    this.router.navigate(['/book/list']);
  }
}
