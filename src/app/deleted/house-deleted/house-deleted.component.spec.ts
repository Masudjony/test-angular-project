import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseDeletedComponent } from './house-deleted.component';

describe('HouseDeletedComponent', () => {
  let component: HouseDeletedComponent;
  let fixture: ComponentFixture<HouseDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseDeletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
