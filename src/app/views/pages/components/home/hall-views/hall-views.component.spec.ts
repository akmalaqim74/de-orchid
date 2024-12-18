import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallViewsComponent } from './hall-views.component';

describe('HallViewsComponent', () => {
  let component: HallViewsComponent;
  let fixture: ComponentFixture<HallViewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HallViewsComponent]
    });
    fixture = TestBed.createComponent(HallViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
