import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateringServiceComponent } from './catering-service.component';

describe('CateringServiceComponent', () => {
  let component: CateringServiceComponent;
  let fixture: ComponentFixture<CateringServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CateringServiceComponent]
    });
    fixture = TestBed.createComponent(CateringServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
