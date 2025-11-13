import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterDeletedComponent } from './renter-deleted.component';

describe('RenterDeletedComponent', () => {
  let component: RenterDeletedComponent;
  let fixture: ComponentFixture<RenterDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenterDeletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenterDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
