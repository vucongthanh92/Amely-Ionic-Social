import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRedeemComponent } from './history-redeem.component';

describe('HistoryRedeemComponent', () => {
  let component: HistoryRedeemComponent;
  let fixture: ComponentFixture<HistoryRedeemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryRedeemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryRedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
