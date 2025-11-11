import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatAsignComponent } from './flat-asign.component';

describe('FlatAsignComponent', () => {
  let component: FlatAsignComponent;
  let fixture: ComponentFixture<FlatAsignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlatAsignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlatAsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
