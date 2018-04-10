import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickPayListItemComponent } from './quick-pay-list-item.component';

describe('QuickPayListItemComponent', () => {
  let component: QuickPayListItemComponent;
  let fixture: ComponentFixture<QuickPayListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickPayListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickPayListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
