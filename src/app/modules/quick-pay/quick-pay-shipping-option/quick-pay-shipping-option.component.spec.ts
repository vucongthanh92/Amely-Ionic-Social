import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPayShippingOptionComponent } from './quick-pay-shipping-option.component';

describe('QuickPayShippingOptionComponent', () => {
  let component: QuickPayShippingOptionComponent;
  let fixture: ComponentFixture<QuickPayShippingOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPayShippingOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPayShippingOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
