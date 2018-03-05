import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositConfirmComponent } from './deposit-confirm.component';

describe('DepositConfirmComponent', () => {
  let component: DepositConfirmComponent;
  let fixture: ComponentFixture<DepositConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
