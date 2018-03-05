import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftHistoryComponent } from './gift-history.component';

describe('GiftHistoryComponent', () => {
  let component: GiftHistoryComponent;
  let fixture: ComponentFixture<GiftHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
