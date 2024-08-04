import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { AuthorCreateComponent } from './author-create/author-create.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
//import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AuthorListComponent,
    AuthorDetailsComponent,
    AuthorCreateComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    ReactiveFormsModule ,
    BsDatepickerModule.forRoot(),
    //ModalModule.forRoot() // Додайте тут
    //SharedModule
  ],
  providers: [
    provideClientHydration(),
    [DatePipe],
  ],
  
  bootstrap: [AppComponent]
})
export class AuthorModule { }
