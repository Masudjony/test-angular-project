import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDeletedComponent } from './payment-deleted.component';

describe('PaymentDeletedComponent', () => {
  let component: PaymentDeletedComponent;
  let fixture: ComponentFixture<PaymentDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDeletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
