import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPaymentOptionsComponent } from './payment-payment-options.component';

describe('PaymentPaymentOptionsComponent', () => {
  let component: PaymentPaymentOptionsComponent;
  let fixture: ComponentFixture<PaymentPaymentOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentPaymentOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPaymentOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
