import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { BookItem } from 'src/app/services/interface';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit{
  books: BookItem[] = [];
  constructor(private bookService: BookService) {}
  ngOnInit(): void {
    this.bookService.books$.subscribe((books) => {
      this.books = books;
    });
  }

  addToWishList(bookname:string, id: string){
    this.bookService.addToWishList(bookname, id);
  }

}
