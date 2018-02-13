import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryTargetsGiftComponent } from './inventory-targets-gift.component';

describe('InventoryTargetsGiftComponent', () => {
  let component: InventoryTargetsGiftComponent;
  let fixture: ComponentFixture<InventoryTargetsGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryTargetsGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryTargetsGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
