import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersMyselfComponent } from './offers-myself.component';

describe('OffersMyselfComponent', () => {
  let component: OffersMyselfComponent;
  let fixture: ComponentFixture<OffersMyselfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersMyselfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersMyselfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
