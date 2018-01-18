import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersPendingComponent } from './offers-pending.component';

describe('OffersPendingComponent', () => {
  let component: OffersPendingComponent;
  let fixture: ComponentFixture<OffersPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
