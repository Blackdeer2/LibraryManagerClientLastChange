import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookUpdateComponent } from './book-update/book-update.component';

const routes: Routes = [
  { path:'list', component: BookListComponent },
  { path:'book', component: BookCreateComponent},
  { path: 'update/:id', component: BookUpdateComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
