import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptDeletedComponent } from './receipt-deleted.component';

describe('ReceiptDeletedComponent', () => {
  let component: ReceiptDeletedComponent;
  let fixture: ComponentFixture<ReceiptDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiptDeletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
