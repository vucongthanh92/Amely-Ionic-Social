import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftItemDetailComponent } from './gift-item-detail.component';

describe('GiftItemDetailComponent', () => {
  let component: GiftItemDetailComponent;
  let fixture: ComponentFixture<GiftItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
