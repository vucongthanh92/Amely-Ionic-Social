import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReceiverInfoComponent } from './payment-receiver-info.component';

describe('PaymentReceiverInfoComponent', () => {
  let component: PaymentReceiverInfoComponent;
  let fixture: ComponentFixture<PaymentReceiverInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentReceiverInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReceiverInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
