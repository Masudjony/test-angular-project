import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseDeletedComponent } from './expense-deleted.component';

describe('ExpenseDeletedComponent', () => {
  let component: ExpenseDeletedComponent;
  let fixture: ComponentFixture<ExpenseDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseDeletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
