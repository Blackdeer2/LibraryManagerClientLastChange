import { Author } from '../../_interfaces/author.model';
import { AuthorForCreation } from '../../_interfaces/authorforcreation.model';
import { EnvironmentUrlService } from './environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorRepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getAuthors = (route: string) => {
    return this.http.get<Author[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  public getAuthor = (route: string) => {
    return this.http.get<Author>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  public createAuthor = (route: string, author: AuthorForCreation) => {
    return this.http.post<Author>(this.createCompleteRoute(route, this.envUrl.urlAddress), author, this.generateHeaders());
  }

  public updateAuthor = (route: string, author: Author) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), author, this.generateHeaders());
  }

  public deleteAuthor = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
  
}