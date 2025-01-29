import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlannerComponent } from './event-planner.component';

describe('EventPlannerComponent', () => {
  let component: EventPlannerComponent;
  let fixture: ComponentFixture<EventPlannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventPlannerComponent]
    });
    fixture = TestBed.createComponent(EventPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
