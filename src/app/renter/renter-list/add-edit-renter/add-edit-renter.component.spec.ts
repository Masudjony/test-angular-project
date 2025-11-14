import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRenterComponent } from './add-edit-renter.component';

describe('AddEditRenterComponent', () => {
  let component: AddEditRenterComponent;
  let fixture: ComponentFixture<AddEditRenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditRenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
