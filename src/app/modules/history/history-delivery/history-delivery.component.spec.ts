import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDeliveryComponent } from './history-delivery.component';

describe('HistoryDeliveryComponent', () => {
  let component: HistoryDeliveryComponent;
  let fixture: ComponentFixture<HistoryDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
