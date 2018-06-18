import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDeliveryFromStorageComponent } from './history-delivery-from-storage.component';

describe('HistoryDeliveryFromStorageComponent', () => {
  let component: HistoryDeliveryFromStorageComponent;
  let fixture: ComponentFixture<HistoryDeliveryFromStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryDeliveryFromStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryDeliveryFromStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
