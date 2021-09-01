import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should return U.S. date string', () => {
    const date = component.formatDate('2012-01-01T00:00:00.000Z');
    expect(date).toBe('12/31/2011');
  });

  it('should return undefined date', () => {
    const date = component.formatDate(null);
    expect(date).toBeUndefined();
  });

  it('should set the search example', () => {
    component.searchExample();
    expect(component.searchForm.get('term').value).toBe('javascript');
  });
});
