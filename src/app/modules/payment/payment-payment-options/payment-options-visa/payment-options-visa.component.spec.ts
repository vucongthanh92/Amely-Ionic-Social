import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOptionsVisaComponent } from './payment-options-visa.component';

describe('PaymentOptionsVisaComponent', () => {
  let component: PaymentOptionsVisaComponent;
  let fixture: ComponentFixture<PaymentOptionsVisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentOptionsVisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOptionsVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
