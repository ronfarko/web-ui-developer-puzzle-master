import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  getReadingList,
  removeFromReadingList
} from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  removeFromReadingList(item): void {
    // remove item from the reading list
    this.store.dispatch(removeFromReadingList({ item }));

    // show snackbar with undo action
    // prefered way: add a common service for snackbar in shared module and reuse it
    const snakbar = this.snackBar.open(
      `Removed "${item.title}" from the Reading List`,
      'UNDO',
      {
        duration: 3000,
        verticalPosition: 'bottom'
      }
    );

    // add the book to the reading list if UNDO selected
    snakbar.afterDismissed().subscribe((status) => {
      if (status.dismissedByAction) {
        this.store.dispatch(
          addToReadingList({
            book: {
              ...item,
              id: item.bookId
            }
          })
        );
      }
    });
  }
}
