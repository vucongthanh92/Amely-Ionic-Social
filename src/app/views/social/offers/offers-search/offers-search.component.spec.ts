import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersSearchComponent } from './offers-search.component';

describe('OffersSearchComponent', () => {
  let component: OffersSearchComponent;
  let fixture: ComponentFixture<OffersSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
