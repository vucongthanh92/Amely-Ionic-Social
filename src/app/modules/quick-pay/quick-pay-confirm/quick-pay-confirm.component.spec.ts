import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPayConfirmComponent } from './quick-pay-confirm.component';

describe('QuickPayConfirmComponent', () => {
  let component: QuickPayConfirmComponent;
  let fixture: ComponentFixture<QuickPayConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPayConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPayConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
