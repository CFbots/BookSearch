import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { Observable, of } from 'rxjs';
import { WishList } from 'src/app/services/interface';
@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit{
  wishlists$!: Observable<WishList[]>; 

  constructor(private bookService: BookService) {}
  ngOnInit(): void {
    this.wishlists$ = this.bookService.wishes$;
  }

  deleteWishItem(wishItem: WishList){
    this.bookService.deleteFromWishList(wishItem.bookid);
  }

}


