import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PakejModalComponent } from './pakej-modal.component';

describe('PakejModalComponent', () => {
  let component: PakejModalComponent;
  let fixture: ComponentFixture<PakejModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PakejModalComponent]
    });
    fixture = TestBed.createComponent(PakejModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
