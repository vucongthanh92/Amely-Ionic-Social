import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCustomerInfoComponent } from './payment-customer-info.component';

describe('PaymentCustomerInfoComponent', () => {
  let component: PaymentCustomerInfoComponent;
  let fixture: ComponentFixture<PaymentCustomerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentCustomerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCustomerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
