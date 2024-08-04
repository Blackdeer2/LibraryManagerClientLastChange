import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
