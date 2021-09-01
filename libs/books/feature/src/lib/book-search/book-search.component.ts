import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  removeFromReadingList,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {
  books$ = this.store.select(getAllBooks);

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  formatDate(date: void | string): string {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book): void {
    // add the book to the reading list
    this.store.dispatch(addToReadingList({ book }));

    // show snackbar with undo action
    // prefered way: add a common service for snackbar in shared module and reuse it
    const snakbar = this.snackBar.open(
      `Added "${book.title}" to the Reading List`,
      'UNDO',
      {
        duration: 3000,
        verticalPosition: 'bottom'
      }
    );

    // remove the book from the reading list if UNDO selected
    snakbar.afterDismissed().subscribe((status) => {
      if (status.dismissedByAction) {
        this.store.dispatch(
          removeFromReadingList({
            item: {
              ...book,
              bookId: book.id
            }
          })
        );
      }
    });
  }

  searchExample(): void {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks(): void {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
