import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPaymentMethodComponent } from './payment-payment-method.component';

describe('PaymentPaymentMethodComponent', () => {
  let component: PaymentPaymentMethodComponent;
  let fixture: ComponentFixture<PaymentPaymentMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentPaymentMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
