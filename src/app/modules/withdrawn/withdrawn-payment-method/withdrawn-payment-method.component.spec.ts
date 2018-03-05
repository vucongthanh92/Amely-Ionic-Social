import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawnPaymentMethodComponent } from './withdrawn-payment-method.component';

describe('WithdrawnPaymentMethodComponent', () => {
  let component: WithdrawnPaymentMethodComponent;
  let fixture: ComponentFixture<WithdrawnPaymentMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrawnPaymentMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawnPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
