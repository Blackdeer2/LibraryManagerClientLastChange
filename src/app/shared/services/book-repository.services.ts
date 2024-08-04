import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EnvironmentUrlService } from "./environment-url.service";
import { Book } from "../../_interfaces/book.model";
import { BookForCreation } from "../../_interfaces/bookforcreation.model";


@Injectable({
  providedIn: 'root'
})
export class BookRepositoryService {
  [x: string]: any;

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getBooks = (route: string) => {
    return this.http.get<Book[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  public getBook = (route: string) => {
    return this.http.get<Book>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  public createBook = (route: string, book: BookForCreation) => {
    return this.http.post<Book>(this.createCompleteRoute(route, this.envUrl.urlAddress), book, this.generateHeaders());
  }

  public updateBook = (route: string, book: Book) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), book, this.generateHeaders());
  }

  public deleteBook = (route: string) => {
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