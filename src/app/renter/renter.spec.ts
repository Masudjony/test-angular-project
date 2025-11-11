import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Renter } from './renter';

describe('Renter', () => {
  let component: Renter;
  let fixture: ComponentFixture<Renter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Renter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Renter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
