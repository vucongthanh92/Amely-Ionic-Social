import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletWithdrawnComponent } from './wallet-withdrawn.component';

describe('WalletWithdrawnComponent', () => {
  let component: WalletWithdrawnComponent;
  let fixture: ComponentFixture<WalletWithdrawnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletWithdrawnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletWithdrawnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
