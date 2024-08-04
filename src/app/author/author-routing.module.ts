import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';

const routes: Routes = [
  { path: 'list', component: AuthorListComponent },
  { path: 'details/:id', component: AuthorDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
