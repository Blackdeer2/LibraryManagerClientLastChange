import { Book } from "./book.model";

export interface Author{
    id: string;
    name: string;

    books?: Book[];
  }