import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderFilter } from './calender-filter';

describe('CalenderFilter', () => {
  let component: CalenderFilter;
  let fixture: ComponentFixture<CalenderFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalenderFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalenderFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
