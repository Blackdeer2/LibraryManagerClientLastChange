import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AuthorRepositoryService } from '../../shared/services/author-repository.services';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { DatePipe } from '@angular/common';
import { Author } from '../../_interfaces/author.model';
import { AuthorForCreation } from '../../_interfaces/authorforcreation.model';
import { SuccessModalComponent } from '../../shared/modals/success-modal/success-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrl: './author-create.component.css'
})
export class AuthorCreateComponent implements OnInit {

  errorMessage: string = '';
  authorForm!: FormGroup;
  bsModalRef!: BsModalRef;

  constructor(private repository: AuthorRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private datePipe: DatePipe, private modal: BsModalService) { }

  ngOnInit(): void {
    this.authorForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }

  validateControl = (controlName: string) => {
    if (this.authorForm.get(controlName)?.invalid && this.authorForm.get(controlName)?.touched)
      return true;
    
    return false;
  } 
  
  hasError = (controlName: string, errorName: string) => {
    if (this.authorForm?.get(controlName)?.hasError(errorName))
      return true;
    
    return false;
  }
  createAuthor = (authorFormValue: any) => {
    if (this.authorForm.valid)
      this.executeAuthorCreation(authorFormValue);
  }

  private executeAuthorCreation = (authorFormValue:any) => {
    const author: AuthorForCreation = {
      name: authorFormValue.name
    }
    const apiUrl = 'api/author';
    this.repository.createAuthor(apiUrl, author)
    .subscribe({
      next: (a: Author) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Author: ${a.name} created successfully`,
            okButtonText: 'OK'
          }
        };
  
        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe((_: any) => this.redirectToAuthorList());
        
      },
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  
  }
  redirectToAuthorList = () => {
    this.router.navigate(['/author/list']);
  }
}
