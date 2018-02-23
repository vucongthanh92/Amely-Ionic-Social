import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCounterOfferComponent } from './modal-counter-offer.component';

describe('ModalCounterOfferComponent', () => {
  let component: ModalCounterOfferComponent;
  let fixture: ComponentFixture<ModalCounterOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCounterOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCounterOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
