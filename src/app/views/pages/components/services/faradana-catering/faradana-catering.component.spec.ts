import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaradanaCateringComponent } from './faradana-catering.component';

describe('FaradanaCateringComponent', () => {
  let component: FaradanaCateringComponent;
  let fixture: ComponentFixture<FaradanaCateringComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaradanaCateringComponent]
    });
    fixture = TestBed.createComponent(FaradanaCateringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
