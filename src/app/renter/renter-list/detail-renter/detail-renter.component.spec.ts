import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRenterComponent } from './detail-renter.component';

describe('DetailRenterComponent', () => {
  let component: DetailRenterComponent;
  let fixture: ComponentFixture<DetailRenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailRenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
