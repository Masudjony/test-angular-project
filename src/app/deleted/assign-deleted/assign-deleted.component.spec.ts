import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDeletedComponent } from './assign-deleted.component';

describe('AssignDeletedComponent', () => {
  let component: AssignDeletedComponent;
  let fixture: ComponentFixture<AssignDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignDeletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
