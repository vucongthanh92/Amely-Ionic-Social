import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRedeemDetailComponent } from './history-redeem-detail.component';

describe('HistoryRedeemDetailComponent', () => {
  let component: HistoryRedeemDetailComponent;
  let fixture: ComponentFixture<HistoryRedeemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryRedeemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryRedeemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
