import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPayShippingMethodComponent } from './quick-pay-shipping-method.component';

describe('QuickPayShippingMethodComponent', () => {
  let component: QuickPayShippingMethodComponent;
  let fixture: ComponentFixture<QuickPayShippingMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPayShippingMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPayShippingMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
