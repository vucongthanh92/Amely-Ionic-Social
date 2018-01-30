import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOptionsAtmComponent } from './payment-options-atm.component';

describe('PaymentOptionsAtmComponent', () => {
  let component: PaymentOptionsAtmComponent;
  let fixture: ComponentFixture<PaymentOptionsAtmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentOptionsAtmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOptionsAtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
