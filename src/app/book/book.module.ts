import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookUpdateComponent } from './book-update/book-update.component';


@NgModule({
  declarations: [
    BookListComponent,
    BookCreateComponent,
    BookUpdateComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    ReactiveFormsModule,
  ]
})
export class BookModule { }
