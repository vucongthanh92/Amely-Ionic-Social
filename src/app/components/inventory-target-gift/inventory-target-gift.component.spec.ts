import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTargetGiftComponent } from './inventory-target-gift.component';

describe('InventoryTargetGiftComponent', () => {
  let component: InventoryTargetGiftComponent;
  let fixture: ComponentFixture<InventoryTargetGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryTargetGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTargetGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
