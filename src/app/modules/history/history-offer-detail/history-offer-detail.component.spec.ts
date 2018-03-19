import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOfferDetailComponent } from './history-offer-detail.component';

describe('HistoryOfferDetailComponent', () => {
  let component: HistoryOfferDetailComponent;
  let fixture: ComponentFixture<HistoryOfferDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryOfferDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOfferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
