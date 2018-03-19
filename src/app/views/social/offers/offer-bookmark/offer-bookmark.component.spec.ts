import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferBookmarkComponent } from './offer-bookmark.component';

describe('OfferBookmarkComponent', () => {
  let component: OfferBookmarkComponent;
  let fixture: ComponentFixture<OfferBookmarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferBookmarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
