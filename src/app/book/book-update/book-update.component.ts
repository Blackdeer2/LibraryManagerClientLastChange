import { Component, OnInit } from '@angular/core';
import { Book } from '../../_interfaces/book.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BookRepositoryService } from '../../shared/services/book-repository.services';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { BookForUpdate } from '../../_interfaces/bookforupdate.model';
import { SuccessModalComponent } from '../../shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrl: './book-update.component.css'
})
export class BookUpdateComponent implements OnInit {
  book!: Book;
  bookForm!: FormGroup;
  bsModalRef?:BsModalRef;

  constructor(private repository: BookRepositoryService, private errorHandler: ErrorHandlerService, 
    private router: Router, private activeRoute: ActivatedRoute, 
    private modal: BsModalService) { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    });

    this.getBookById();
  }

  private getBookById = () => {
    const bookId: string = this.activeRoute.snapshot.params['id'];
    const bookByIdUri: string = `api/book/${bookId}`;

    this.repository.getBook(bookByIdUri)
    .subscribe({
      next: (b: Book) => {
        this.bookForm.patchValue({
          title: this.book.title
        });
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
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

  public updateBook = (bookFormValue:any) => {
    if (this.bookForm.valid)
      this.executeBookUpdate(bookFormValue);
  }

  private executeBookUpdate = (bookFormValue:any) => {
    const bookForUpd: BookForUpdate = {
      title: bookFormValue.name,
      id: ''
    }

    const apiUri: string = `api/book/${this.book.id}`;

    this.repository.updateBook(apiUri, bookForUpd)
    .subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: 'Book updated successfully',
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe((_: any) => this.redirectToBookList());
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  public redirectToBookList = () => {
    this.router.navigate(['/book/list']);
  }

}
