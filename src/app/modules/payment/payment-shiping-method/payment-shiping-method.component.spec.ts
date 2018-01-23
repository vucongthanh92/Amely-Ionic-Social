import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentShipingMethodComponent } from './payment-shiping-method.component';

describe('PaymentShipingMethodComponent', () => {
  let component: PaymentShipingMethodComponent;
  let fixture: ComponentFixture<PaymentShipingMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentShipingMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentShipingMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
