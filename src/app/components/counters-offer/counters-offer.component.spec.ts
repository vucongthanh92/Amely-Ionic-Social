import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountersOfferComponent } from './counters-offer.component';

describe('CountersOfferComponent', () => {
  let component: CountersOfferComponent;
  let fixture: ComponentFixture<CountersOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountersOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountersOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
