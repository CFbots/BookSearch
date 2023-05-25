import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { BookService } from './services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HoverBookItemDirective } from './directives/hover-book-item.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


export const BaseUrl = new InjectionToken<string>('');
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    BookListComponent,
    WishListComponent,
    HoverBookItemDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [BookService,
    {provide: BaseUrl, useValue:'https://www.googleapis.com/books/v1/volumes?q='}],
  bootstrap: [AppComponent]
})
export class AppModule { }
