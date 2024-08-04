import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [  
{ path: 'home', component: HomeComponent },
{path:'author', loadChildren: () => import('./author/author.module').then(m=>m.AuthorModule)},
//{ path: '500', component: InternalServerComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: '**', redirectTo: '/404', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
