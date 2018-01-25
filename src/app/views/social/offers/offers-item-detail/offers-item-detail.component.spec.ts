import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersItemDetailComponent } from './offers-item-detail.component';

describe('OffersItemDetailComponent', () => {
  let component: OffersItemDetailComponent;
  let fixture: ComponentFixture<OffersItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
