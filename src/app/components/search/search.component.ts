import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime, fromEvent, switchMap, mergeMap, takeUntil, tap, of } from 'rxjs';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy{
  @ViewChild('inputbox', {static: true}) inputbox!: ElementRef;  //static: true means query avaliable on onInit
  private notifier = new Subject();
  isLoading: Boolean = false;

  bookname:string = '';
  constructor(private bookService: BookService){}
  
  ngOnInit(): void {
      fromEvent(this.inputbox.nativeElement, 'keyup')
        .pipe(
          tap(()=>this.isLoading = true),
          debounceTime(500),
          switchMap((_) => { 
            if (this.bookname.trim() !== ''){
              return this.bookService.searchBook(this.bookname); 
            } else {
              return of(null);
            }
          }), 
          takeUntil(this.notifier)
    ).subscribe(()=>{
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    // this.inputsbp.unsubscribe();
  }

  unSubscribe(){
    this.notifier.next(null);
    this.notifier.complete();
  }
}
