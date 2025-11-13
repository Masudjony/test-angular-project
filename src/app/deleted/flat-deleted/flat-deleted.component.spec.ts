import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatDeletedComponent } from './flat-deleted.component';

describe('FlatDeletedComponent', () => {
  let component: FlatDeletedComponent;
  let fixture: ComponentFixture<FlatDeletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlatDeletedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlatDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
