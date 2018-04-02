import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWebviewComponent } from './payment-webview.component';

describe('PaymentWebviewComponent', () => {
  let component: PaymentWebviewComponent;
  let fixture: ComponentFixture<PaymentWebviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentWebviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWebviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
