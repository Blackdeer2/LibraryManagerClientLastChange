import { Component, OnInit } from '@angular/core';
import { Book } from '../../_interfaces/book.model';
import { BookRepositoryService } from '../../shared/services/book-repository.services';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})



export class BookListComponent implements OnInit {
  books!: Book[];
  constructor(private repository: BookRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router) { }
  ngOnInit(): void {
    this.getAllBooks();
  }
  private getAllBooks = () => {
    const apiAddress: string = 'api/book';
    this.repository.getBooks(apiAddress)
    .subscribe(b => {
      this.books = b;
    })
  }
  public redirectToUpdatePage = (id:any) => { 
    const updateUrl: string = `/book/update/${id}`; 
    this.router.navigate([updateUrl]); 
  }
}