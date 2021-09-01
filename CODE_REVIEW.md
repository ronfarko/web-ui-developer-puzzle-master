#Code Review Comments

### book-search component

- return types are missing for formatDate, addBookToReadingList, searchExample, and searchBooks functions (fixed)
- subscription to "getAllBooks" selector needs to be cleaned up or use of async pipe (fixed)
- defect: when type a search term, the previous result set appears (fixed)

### reading-list component

- return types are missing for removeFromReadingList function (fixed)

### total-count component

- ngOnInit function is reduntant (removed)

### state management

- reading-list.reducer.ts: adding book to reading list must be done on confirmedAddToReadingList not addToReadingList (which is for effects) - fixed

# Accessibility

### Automated Scan Results

- Buttons do not have an accessible name (search button and reading list close button are missing aria-label) - fixed
- Background and foreground colors do not have a sufficient contrast ratio ("Reading List" tile on title bar, and default message on search content) - fixed

### Manual Scan Results

- book-search.component.html: img tag missing "alt" (fixed)
- reading-list.component.html: img tag missing "alt" (fixed)

# Failing Unit Tests

- reading-list.reducer.spec.ts - 2 errors (fixed, added missing reducers)
