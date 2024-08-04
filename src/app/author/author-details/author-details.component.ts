import { Component, OnInit } from '@angular/core';
import { Author } from '../../_interfaces/author.model';
import { AuthorRepositoryService } from '../../shared/services/author-repository.services';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent implements OnInit {

  author: Author | undefined;
  errorMessage: string = '';

  constructor(private repository: AuthorRepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }
  ngOnInit(): void {
    this.getAuthorDetails()
  }

  getAuthorDetails = () => {

    const id: string = this.activeRoute.snapshot.params['id'];
    const apiUrl: string = `api/author/${id}/book`;

    this.repository.getAuthor(apiUrl)
      .subscribe({
        next: (a: Author) => this.author = a,
        error: (err: HttpErrorResponse)=> {
          this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
}

}
