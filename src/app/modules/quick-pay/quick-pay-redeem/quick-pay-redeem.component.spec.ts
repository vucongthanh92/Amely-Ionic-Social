import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPayRedeemComponent } from './quick-pay-redeem.component';

describe('QuickPayRedeemComponent', () => {
  let component: QuickPayRedeemComponent;
  let fixture: ComponentFixture<QuickPayRedeemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPayRedeemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPayRedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
