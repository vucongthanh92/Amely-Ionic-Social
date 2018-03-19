import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDeliveryDetailComponent } from './history-delivery-detail.component';

describe('HistoryDeliveryDetailComponent', () => {
  let component: HistoryDeliveryDetailComponent;
  let fixture: ComponentFixture<HistoryDeliveryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryDeliveryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryDeliveryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
