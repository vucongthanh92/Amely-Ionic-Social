import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryConfirmComponent } from './delivery-confirm.component';

describe('DeliveryConfirmComponent', () => {
  let component: DeliveryConfirmComponent;
  let fixture: ComponentFixture<DeliveryConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
