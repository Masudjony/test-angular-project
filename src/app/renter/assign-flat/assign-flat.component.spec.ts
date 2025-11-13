import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFlatComponent } from './assign-flat.component';

describe('AssignFlatComponent', () => {
  let component: AssignFlatComponent;
  let fixture: ComponentFixture<AssignFlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignFlatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
