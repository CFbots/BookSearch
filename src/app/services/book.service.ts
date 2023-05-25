import { Inject, Injectable } from '@angular/core';
import { BaseUrl } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { Subject, tap, map, BehaviorSubject, catchError, throwError } from 'rxjs';
import { Response, Book, BookItem, WishList} from './interface';

@Injectable()
export class BookService {
  private booklist: BookItem[] = [];
  private booklist$ = new BehaviorSubject<BookItem[]>(this.booklist);
  private id:string = "";
  private duplicate: Boolean = false;
  books$ = this.booklist$.asObservable();

  private wishlist: WishList[] = [];
  private wishlist$ = new BehaviorSubject<WishList[]>(this.wishlist);
  wishes$ = this.wishlist$.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(BaseUrl) private baseUrl: string
  ) {}

  searchBook(bookname: string) {
    return this.http.get<Response>(this.baseUrl + bookname).pipe(
      map((res) => {
        console.log("getting the raw data from searchBook", res);
        return res.items?.map(({ volumeInfo: volume, id: id}: Book) => {
          return {
            id: id,
            bookpickture: volume?.imageLinks?.thumbnail,
            bookname: volume?.title,
            publisher: volume?.publisher,
            publishdate: volume?.publishedDate,
            description: volume?.description,
          };
        });
  
      }),
      tap((books: BookItem[]) => {
        console.log("getting the book from searchBook!", books),
        this.booklist = books;
        this.booklist$.next(this.booklist);
      }),
      catchError((error)=>{
        return throwError(()=>alert(JSON.stringify(error)))
      })
    );
  }

  addToWishList(name: string, id:string) {
    const isDuplicate = this.wishlist.some(book => book.bookid === id);
  
    if (!isDuplicate) {
      this.wishlist = [{ bookname: name, bookid: id }, ...this.wishlist];
      this.wishlist$.next(this.wishlist);
    }
  }

  deleteFromWishList(id:string){
    this.wishlist = this.wishlist.filter((wishitem) => wishitem.bookid !== id);
    this.wishlist$.next(this.wishlist);
  }
}