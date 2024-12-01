import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareFormModalComponent } from './share-form-modal.component';

describe('ShareFormModalComponent', () => {
  let component: ShareFormModalComponent;
  let fixture: ComponentFixture<ShareFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareFormModalComponent]
    });
    fixture = TestBed.createComponent(ShareFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
