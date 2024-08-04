import { Component, OnInit } from '@angular/core';
import { Author } from '../../_interfaces/author.model';
import { AuthorRepositoryService } from '../../shared/services/author-repository.services';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css'
})
export class AuthorListComponent implements OnInit {
  authors: Author[] = [];
  errorMessage: string = '';

  constructor(private repository: AuthorRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllAuthors();
  }

  private getAllAuthors = () =>{
    const apiAddress: string = 'api/author';
    this.repository.getAuthors(apiAddress)
    .subscribe({
      next: (a: Author[])=> this.authors = a,
      error:(err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
    }
    }
    )
  }

  public getAuthorDetails = (id: any) => { 
    const detailsUrl: string = `/author/details/${id}`; 
    this.router.navigate([detailsUrl]); 
  }

}
