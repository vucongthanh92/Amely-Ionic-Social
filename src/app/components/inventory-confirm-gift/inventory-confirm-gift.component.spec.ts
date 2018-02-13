import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryConfirmGiftComponent } from './inventory-confirm-gift.component';

describe('InventoryConfirmGiftComponent', () => {
  let component: InventoryConfirmGiftComponent;
  let fixture: ComponentFixture<InventoryConfirmGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryConfirmGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryConfirmGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
