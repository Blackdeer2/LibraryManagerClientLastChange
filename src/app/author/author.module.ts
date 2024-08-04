import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { ReactiveFormsModule } from '@angular/forms';
//import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AuthorListComponent,
    AuthorDetailsComponent,
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    //SharedModule
  ]
})
export class AuthorModule { }
