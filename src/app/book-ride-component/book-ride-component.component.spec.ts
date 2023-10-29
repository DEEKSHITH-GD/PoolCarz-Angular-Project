import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRideComponentComponent } from './book-ride-component.component';

describe('BookRideComponentComponent', () => {
  let component: BookRideComponentComponent;
  let fixture: ComponentFixture<BookRideComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookRideComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRideComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
