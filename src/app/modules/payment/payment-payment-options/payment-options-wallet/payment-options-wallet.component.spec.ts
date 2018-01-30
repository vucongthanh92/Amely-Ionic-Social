import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOptionsWalletComponent } from './payment-options-wallet.component';

describe('PaymentOptionsWalletComponent', () => {
  let component: PaymentOptionsWalletComponent;
  let fixture: ComponentFixture<PaymentOptionsWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentOptionsWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOptionsWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
