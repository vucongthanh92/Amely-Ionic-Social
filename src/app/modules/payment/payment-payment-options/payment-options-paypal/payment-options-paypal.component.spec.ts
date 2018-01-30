import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOptionsPaypalComponent } from './payment-options-paypal.component';

describe('PaymentOptionsPaypalComponent', () => {
  let component: PaymentOptionsPaypalComponent;
  let fixture: ComponentFixture<PaymentOptionsPaypalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentOptionsPaypalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOptionsPaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
