import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryGiftComponent } from './inventory-gift.component';

describe('InventoryGiftComponent', () => {
  let component: InventoryGiftComponent;
  let fixture: ComponentFixture<InventoryGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
